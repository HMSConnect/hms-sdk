import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import PractitionerDataManager from '@data-managers/PractitionerDataManager'
import AbstractService from './AbstractService'

export default class PractitionerService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new PractitionerDataManager(resource, adapter)
  }
}
