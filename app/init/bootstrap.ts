import '../validators/standard/sfhir/SFHIRCarePlanV1Validator'
import '../validators/standard/sfhir/SFHIREncounterV1Validator'
import '../validators/standard/sfhir/SFHIRPatientV1Validator'

import DevelopmentAdapter from '../adapters/DevelopmentAdapter'
import EncounterService from '../services/EncounterService'
import { HMSService } from '../services/HMSServiceFactory'
import PatientService from '../services/PatientService'

console.info('HMSServiceFactory Initialize...')
const devAdapter = new DevelopmentAdapter(
  `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`
)

HMSService.register('patient', PatientService)
HMSService.register('encounter', EncounterService)
HMSService.setDefaultAdapter(devAdapter)
