import { useEffect, useState } from 'react'

import { HMSService } from '../../services/HMSServiceFactory'
import PatientService from '../../services/PatientService'
import { IQueryResult } from './usePatientList'

const usePatient = (id: string): any => {
  // const [data, setData] = useState<Patient>({})
  const [result, setResult] = useState<IQueryResult>({
    data: {},
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
        const result = await patientService.load(id)
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
  }, [id])
  return { isLoading, ...result }
}

export default usePatient
