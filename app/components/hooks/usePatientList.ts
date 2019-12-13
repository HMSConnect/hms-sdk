import { useEffect, useState } from 'react'

import { HMSService } from '../../services/HMSServiceFactory'
import PatientService from '../../services/PatientService'
import { ISchema } from '../../validators/ValidatorManager'

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
  const [result, setResult] = useState<IQueryResult>({
    data: [],
    error: null,
    totalCount: 0
  })
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const patientService = HMSService.getService(
          'patient'
        ) as PatientService
        const result = await patientService.list(options)
        setResult(result)
      } catch (error) {
        setResult((prevResult: IQueryResult) => ({
          ...prevResult,
          error: error.message ? error.message : error
        }))
      } finally {
        setLoading(false)
      }
    })()
  }, [options])
  return { isLoading, ...result }
}

export default usePatientList
