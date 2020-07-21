import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import HMSPiDataManager from '@data-managers/hms/HMSPiDataManager'
import AbstractService from '../AbstractService'

export default class HMSPiService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new HMSPiDataManager(resource, adapter)
  }
}
