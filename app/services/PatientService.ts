import IAdapter from '../adapters/IAdapter'
import DataManager from '../data-managers/DataManager'
import PatientDataManager from '../data-managers/PatientDataManager'
import ValidatorManager from '../validators/ValidatorManager'
import AbstractService from './AbstractService'

export default class PatientService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new PatientDataManager(resource, adapter)
  }

  async resourceList(params?: any): Promise<any> {
    console.info(`[service] loading resource resourceList`, params)
    const dataManager = this.dataManager as PatientDataManager
    const result = await dataManager.resourceList(params || {})

    const validator = ValidatorManager.compile(result.schema)

    if (validator) {
      return {
        ...result,
        data: result.data.map((result: any) => {
          return {
            ...result,
            data: result.data.map((entry: any) => {
              return validator.parse(entry)
            })
          }
        })
      }
    } else {
      throw Error('not support this schema.')
    }
  }
}
