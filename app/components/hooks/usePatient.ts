import { useEffect, useState } from 'react'
import Patient from '../../models/Patient'
import hmsService from '../../services/HmsService'
const usePatient = (id: string): any => {
  const [data, setData] = useState<Patient>({})
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      const patient = await hmsService.patient.get(id)
      setData(patient)
      setLoading(false)
    })()
  }, [id])
  return { isLoading, data }
}

export default usePatient
