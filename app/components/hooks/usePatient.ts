import { HMSService } from '@services/HMSServiceFactory'
import PatientService from '@services/PatientService'

import usePromise from './utils/usePromise'

const usePatient = (patientId: string): any => {
  return usePromise(() => {
    // const validParams = validQueryParams(['patientId'], { patientId })
    // if (!isEmpty(validParams)) {
    //   return Promise.reject(new Error(join(validParams, ', ')))
    // }
    const patientService = HMSService.getService('patient') as PatientService
    return patientService.load(patientId)
  }, [patientId])
}

export default usePatient
