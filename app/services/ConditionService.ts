import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import ObservationDataManager from '@data-managers/ObservationDataManager'
import AbstractService from './AbstractService'

export default class ConditionService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new ObservationDataManager(resource, adapter)
  }
}
