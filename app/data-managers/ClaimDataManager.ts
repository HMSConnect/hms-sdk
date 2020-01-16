import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IClaimListQuery extends IListDefaultQuery {
  filter?: IClaimListFilterQuery
}

export interface IClaimListFilterQuery {
  patientId?: string
  organizationId?: string
  billablePeriodStart_lt?: Date | string
  billablePeriodStart_gt?: Date | string
  billablePeriodEnd_lt?: Date | string
  billablePeriodEnd_gt?: Date | string
}

class ClaimDataManager extends DataManager {}

export default ClaimDataManager
