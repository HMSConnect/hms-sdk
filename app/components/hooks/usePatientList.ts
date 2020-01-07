import { HMSService } from '@services/HMSServiceFactory'
import PatientService from '@services/PatientService'
import { ISchema } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'

export interface IPatientResultList {
  data: any[]
  totalCount: number
}
export interface IQueryResult {
  error: any
  data: any[] | any
  schema?: ISchema
  totalCount?: number
}
export interface IPatinetLoadResultList extends IQueryResult {
  isLoading: boolean
}
export interface ISortType {
  order: 'asc' | 'desc'
  orderBy: string
}
export interface IPaginationOption {
  offset: number
  max: number
  page: number
  sort?: ISortType
  filter?: any
}

const usePatientList = (options: IPaginationOption): any => {
  return usePromise(() => {
    const patientService = HMSService.getService('patient') as PatientService
    return patientService.list(options)
  }, _.values(options))
}

export default usePatientList
