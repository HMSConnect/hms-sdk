import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IAllergyIntoleranceListQuery extends IListDefaultQuery {
  filter?: IAllergyIntoleranceListFilterQuery
}

export interface IAllergyIntoleranceListFilterQuery {
  patientId?: string
}

class AllergyIntoleranceDataManager extends DataManager {}

export default AllergyIntoleranceDataManager
