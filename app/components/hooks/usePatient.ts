import { HMSService } from '@services/HMSServiceFactory'
import PatientService from '@services/PatientService'
import { validQueryParams } from '@utils'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import usePromise from './utils/usePromise'

const usePatient = (patientId: string): any => {
  return usePromise(() => {
    const validParams = validQueryParams(['patientId'], { patientId })
    if (!isEmpty(validParams)) {
      return Promise.reject(new Error(join(validParams, ', ')))
    }
    const patientService = HMSService.getService('patient') as PatientService
    return patientService.load(patientId)
  }, [patientId])
}

export default usePatient
