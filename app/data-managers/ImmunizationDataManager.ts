import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IImmunizationListQuery extends IListDefaultQuery {
  filter?: IImmunizationListFilterQuery
}

export interface IImmunizationListFilterQuery {
  patientId?: string
  date_lt?: Date | string
  vaccineCode?: string
}

class ImmunizationDataManager extends DataManager {
  typeList(query: any): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/type`, query)
  }
}

export default ImmunizationDataManager
