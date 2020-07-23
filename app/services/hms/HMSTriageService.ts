import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import HMSTriageDataManager from '@data-managers/hms/HMSTriageDataManager'
import AbstractService from '../AbstractService'

export default class HMSTriageService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new HMSTriageDataManager(resource, adapter)
  }
}
