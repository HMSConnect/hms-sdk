import { useEffect, useState } from 'react'

import { HMSService } from '../../services/HMSServiceFactory'
import PatientService from '../../services/PatientService'

export interface PatientResultList {
  results: any[]
  totalCount: number
}
export interface PatinetLoadResultList {
  error: string | null
  data: PatientResultList
  isLoading: boolean
}
export interface SortType {
  order: 'asc' | 'desc'
  orderBy: string
}
export interface PaginationOption {
  offset: number
  max: number
  page: number
  sort: SortType
  filter?: any
}

const usePatientList = (options: PaginationOption): PatinetLoadResultList => {
  const [data, setData] = useState<PatientResultList>({
    results: [],
    totalCount: 0
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const patientService = HMSService.getService(
          'patient'
        ) as PatientService
        const result = await patientService.list(options)
        setData({
          results: result.data,
          totalCount: result.totalCount
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error.message)
      }
    })()
  }, [options])
  return { isLoading, data, error }
}

export default usePatientList
