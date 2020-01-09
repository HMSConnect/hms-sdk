import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IObservationListQuery extends IListDefaultQuery {
  filter?: IObservationListFilterQuery
}

export interface IObservationListFilterQuery {
  patientId?: string
  encounterId?: string
  categoryCode?: string
  issued_lt?: Date | string
}

class ObservationDataManager extends DataManager {}

export default ObservationDataManager
