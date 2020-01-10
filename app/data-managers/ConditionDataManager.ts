import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IConditionListQuery extends IListDefaultQuery {
  filter?: IConditionListFilterQuery
}

export interface IConditionListFilterQuery {
  patientId?: string
  onsetDateTime_lt?: Date | string
}

class ConditionDataManager extends DataManager {}

export default ConditionDataManager
