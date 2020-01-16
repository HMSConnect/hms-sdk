import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IImagingStudyListQuery extends IListDefaultQuery {
  filter?: IImagingStudyListFilterQuery
}

export interface IImagingStudyListFilterQuery {
  patientId?: string
  encounterId?: string
  started_lt?: Date | string
}

class ImagingStudyDataManager extends DataManager {}

export default ImagingStudyDataManager
