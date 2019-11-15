import { useEffect, useState } from 'react'
import hmsService from '../../services/HmsService'

export interface PatientResultList {
  results: any[]
  totalCount: number
}
export interface PatinetLoadResultList {
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
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      const results: PatientResultList = await hmsService.patient.list(options)
      setData({
        results: results.results,
        totalCount: results.totalCount
      })
      setLoading(false)
    })()
  }, [options])
  return { isLoading, data }
}

export default usePatientList
