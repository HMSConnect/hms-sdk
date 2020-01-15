import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IMedicationRequestQuery extends IListDefaultQuery {
  filter?: IMedicationRequestFilterQuery
}

export interface IMedicationRequestFilterQuery {
  patientId?: string
  encounterId?: string
  authoredOn_lt?: Date | string
  medicationCodeableConcept?: string
  status?: string
}

class MedicationRequestDataManager extends DataManager {}

export default MedicationRequestDataManager
