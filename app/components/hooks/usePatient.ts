import { HMSService } from '../../services/HMSServiceFactory'
import PatientService from '../../services/PatientService'
import usePromise from './utils/usePromise'

const usePatient = (id: string): any => {
  return usePromise(() => {
    const patientService = HMSService.getService('patient') as PatientService
    return patientService.load(id)
  }, [id])
}

export default usePatient
