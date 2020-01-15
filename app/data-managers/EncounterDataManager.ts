import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IEncounterListQuery extends IListDefaultQuery {
  filter?: IEncounterListFilterQuery
}

export interface IEncounterListFilterQuery {
  patientId?: string
  periodStart_lt?: Date | string
  type?: string
  status?: string
}

class EncounterDataManager extends DataManager {
  // customize operation if needed
  typeList(query: any): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/type`, query)
  }

  resourceList(id: string): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/${id}/resource-list`, {})
  }
}

export default EncounterDataManager
