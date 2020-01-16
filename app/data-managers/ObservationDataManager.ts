import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
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

export function mergeWithObservationInitialFilterQuery(
  initialFilter: IObservationListFilterQuery,
  fixFilter?: any,
): IObservationListFilterQuery {
  return defaults(initialFilter, {
    categoryCode: undefined,
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
