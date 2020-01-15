import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IProcedureListQuery extends IListDefaultQuery {
  filter?: IProcedureListFilterQuery
}

export interface IProcedureListFilterQuery {
  patientId?: string
  encounterId?: string
  periodStart_lt?: Date | string
  code?: string
}

class ProcedureDataManager extends DataManager {}

export default ProcedureDataManager
