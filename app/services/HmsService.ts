import PatientDataAdaptor from '../adapters/PatientDataAdapter'
import PatientService from './PatientService'

class HmsService {
  public patient: PatientService
  constructor(patientService: PatientService) {
    this.patient = patientService
  }
}

const patientServiceInstance = new PatientService(new PatientDataAdaptor())
const hmsService = new HmsService(patientServiceInstance)

export default hmsService
