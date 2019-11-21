import { useEffect, useState } from 'react'

import Patient from '../../models/Patient'
import { HMSService } from '../../services/HMSServiceFactory'
import PatientService from '../../services/PatientService'

const usePatient = (id: string): any => {
  const [data, setData] = useState<Patient>({})
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      const patientService = HMSService.getService('patient') as PatientService
      const patient = await patientService.load(id)
      setData(patient)
      setLoading(false)
    })()
  }, [id])
  return { isLoading, data }
}

export default usePatient
