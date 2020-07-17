import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import HMSLaboratoryDataManager from '@data-managers/hms/HMSLaboratoryDataManager'
import AbstractService from '@services/AbstractService'
import ValidatorManager from '@validators/ValidatorManager'
import * as _ from 'lodash'

export default class HMSLaboratoryService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new HMSLaboratoryDataManager('laboratory', adapter)
  }

  async list(params: any): Promise<any> {
    // console.info(`[service] loading resource list`, params)
    const result = await this.dataManager.list(this.mapParam(params))

    const validator = ValidatorManager.compile(result.schema)
    if (validator) {
      return {
        ...result,
        data: result.data.map((result: any) => validator.parse(result)),
      }
    } else {
      throw Error('not support this schema.')
    }
  }

  private mapParam(params: any) {
    const cloneParamrs = _.cloneDeep(params)
    const filter = cloneParamrs?.filter || {}
    if (filter._lasted) {
      delete filter._lasted
    }
    return { ...params, filter }
  }
}
