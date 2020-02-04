import { HMSService } from '@services/HMSServiceFactory'
import PatientService from '@services/PatientService'
import { validQueryParams } from '@utils'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'

const usePatient = (patientId: string): any => {
  return usePromise(() => {
    const validParams = validQueryParams(['patientId'], { patientId })
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const patientService = HMSService.getService('patient') as PatientService
    return patientService.load(patientId)
  }, [patientId])
}

export default usePatient
