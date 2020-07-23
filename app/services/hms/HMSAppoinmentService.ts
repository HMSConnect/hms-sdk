import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import HMSAppointmentDataManager from '@data-managers/hms/HMSAppointmentDataManager'
import AbstractService from '../AbstractService'

export default class HMSAppointmentService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new HMSAppointmentDataManager(resource, adapter)
  }
}
