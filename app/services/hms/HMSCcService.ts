import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import HMSCcDataManager from '@data-managers/hms/HMSCcDataManager'
import AbstractService from '../AbstractService'

export default class HMSCcService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new HMSCcDataManager(resource, adapter)
  }
}
