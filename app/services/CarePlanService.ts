import IAdapter from '@adapters/IAdapter'
import CarePlanDataManager from '@data-managers/CarePlanDataManager'
import DataManager from '@data-managers/DataManager'
import AbstractService from './AbstractService'

export default class CarePlanService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new CarePlanDataManager(resource, adapter)
  }

  async typeList(params?: any): Promise<any> {
    // console.info(`[service] loading resource typeList`, params)
    const dataManager = this.dataManager as CarePlanDataManager
    const result = await dataManager.typeList(params || {})
    return {
      ...result,
      data: result.data,
    }
  }
}
