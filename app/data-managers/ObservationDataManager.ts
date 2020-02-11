import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IObservationNeededParams {
  id?: boolean
  patientId?: boolean
  encounterId?: boolean
}
export interface IObservationListQuery extends IListDefaultQuery {
  filter?: IObservationListFilterQuery
  _lasted?: boolean
  max?: number
}

export interface IObservationListFilterQuery {
  patientId?: string
  encounterId?: string
  categoryCode?: string
  issued_lt?: Date | string
  code?: string
  codes?: string
}

export function mergeWithObservationInitialFilterQuery(
  initialFilter: IObservationListFilterQuery,
  fixFilter?: any,
): IObservationListFilterQuery {
  return defaults(initialFilter, {
    categoryCode: undefined,
    code: '',
    issued_lt: undefined,
    patientId: get(fixFilter, 'patientId'),
    status: '',
  })
}

class ObservationDataManager extends DataManager {
  categoryList(query: any): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/category`, query)
  }
}

export default ObservationDataManager
