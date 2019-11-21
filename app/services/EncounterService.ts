import IAdapter from '../adapters/IAdapter'
import DataManager from '../data-managers/DataManager'
import EncounterDataManager from '../data-managers/EncounterDataManager'
import ValidatorManager from '../validators/ValidatorManager'
import AbstractService from './AbstractService'

class EncounterService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new EncounterDataManager(resource, adapter)
  }

  async typeList(params?: any): Promise<any> {
    console.info(`[service] loading resource typeList`, params)
    const dataManager = this.dataManager as EncounterDataManager
    const result = await dataManager.typeList(params || {})
    const validator = ValidatorManager.compile(result.schema)
    if (validator) {
      return {
        ...result,
        data: result.data.map((result: any) => validator.parse(result))
      }
    } else {
      throw Error('not support this schema.')
    }
  }
}

export default EncounterService
