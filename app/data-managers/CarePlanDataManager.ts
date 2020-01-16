import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface ICarePlanListQuery extends IListDefaultQuery {
  filter?: ICarePlanListFilterQuery
}

export interface ICarePlanListFilterQuery {
  patientId?: string
  periodStart_lt?: Date | string
  status?: string
}

export function mergeWithCarePlanInitialFilterQuery(
  initialFilter: ICarePlanListFilterQuery,
  fixFilter?: any,
): ICarePlanListFilterQuery {
  return defaults(initialFilter, {
    periodStart_lt: undefined,
    patientId: get(fixFilter, 'patientId'),
    status: '',
  })
}

class CarePlanDataManager extends DataManager {
  typeList(query: any): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/type`, query)
  }
}

export default CarePlanDataManager
