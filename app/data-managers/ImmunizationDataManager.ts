import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IImmunizationListQuery extends IListDefaultQuery {
  filter?: IImmunizationListFilterQuery
}

export interface IImmunizationListFilterQuery {
  patientId?: string
  onsetDateTime_lt?: Date | string
}

class ImmunizationDataManager extends DataManager {}

export default ImmunizationDataManager
