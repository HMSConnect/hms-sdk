import DevelopmentAdapter from '../adapters/DevelopmentAdapter'
import DiagnosticReportService from '../services/DiagnosticReportService'
import EncounterService from '../services/EncounterService'
import PatientService from '../services/PatientService'
import SFHIRCarePlanV1Validator from '../validators/standard/sfhir/SFHIRCarePlanV1Validator'
import SFHIRDiagnosticReportV1Validator from '../validators/standard/sfhir/SFHIRDiagnosticReportV1Validator'
import SFHIREncounterV1Validator from '../validators/standard/sfhir/SFHIREncounterV1Validator'
import SFHIRObservationV1Validator from '../validators/standard/sfhir/SFHIRObservationV1Validator'
import SFHIROrganizationV1Validator from '../validators/standard/sfhir/SFHIROrganizationV1Validator'
import SFHIRPatientV1Validator from '../validators/standard/sfhir/SFHIRPatientV1Validator'

const environment = {
  localFormat: {
    date: 'YYYY/MM/DD',
    dateTime: 'YYYY/MM/DD HH:mm',
    time: 'HH:mm'
  }
}

export const serviceConfig = {
  ['patient']: { clazz: PatientService },
  ['encounter']: { clazz: EncounterService },
  ['diagnostic_report']: { clazz: DiagnosticReportService }
  // ['observation']: { clazz: ObservationService} // TODO: uncomment when observation service
}

export const validatorConfig = {
  ['SFHIR_PATIENT_V1']: { clazz: SFHIRPatientV1Validator, priority: 1 },
  ['SFHIR_CARE_PLAN_V1']: { clazz: SFHIRCarePlanV1Validator, priority: 1 },
  ['SFHIR_DIAGNOSTIC_REPORT_V1']: {
    clazz: SFHIRDiagnosticReportV1Validator,
    priority: 1
  },
  ['SFHIR_ENCOUNTER_V1']: { clazz: SFHIREncounterV1Validator, priority: 1 },
  ['SFHIR_OBSERVATION_V1']: { clazz: SFHIRObservationV1Validator, priority: 1 },
  ['SFHIR_ORGANIZATION_V1']: {
    clazz: SFHIROrganizationV1Validator,
    priority: 1
  }
}

export const adapterConfig = {
  ['develop']: { clazz: DevelopmentAdapter }
}

export default environment
