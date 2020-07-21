import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import HMSRadiologyDataManager from '@data-managers/hms/HMSRadiologyDataManager'
import AbstractService from '../AbstractService'

export default class HMSRadiologyService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new HMSRadiologyDataManager(resource, adapter)
  }
}
