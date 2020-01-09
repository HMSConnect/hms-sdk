import DevelopmentAdapter from '@adapters/DevelopmentAdapter'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import DiagnosticReportService from '@services/DiagnosticReportService'
import EncounterService from '@services/EncounterService'
import PatientService from '@services/PatientService'
import SFHIRAllergyIntoleranceV1Validator from '@validators/standard/sfhir/SFHIRAllergyIntoleranceV1Validator'
import SFHIRCarePlanV1Validator from '@validators/standard/sfhir/SFHIRCarePlanV1Validator'
import SFHIRDiagnosticReportV1Validator from '@validators/standard/sfhir/SFHIRDiagnosticReportV1Validator'
import SFHIREncounterV1Validator from '@validators/standard/sfhir/SFHIREncounterV1Validator'
import SFHIRObservationV1Validator from '@validators/standard/sfhir/SFHIRObservationV1Validator'
import SFHIROrganizationV1Validator from '@validators/standard/sfhir/SFHIROrganizationV1Validator'
import SFHIRPatientV1Validator from '@validators/standard/sfhir/SFHIRPatientV1Validator'

export const serviceConfig = {
  ['$ALLERGY_INTOLERANCE']: { clazz: AllergyIntoleranceService },
  ['$DIAGNOSTIC_REPORT']: { clazz: DiagnosticReportService },
  ['$ENCOUNTER']: { clazz: EncounterService },
  ['$PATIENT']: { clazz: PatientService },
  // ['$OBSERVATION']: { clazz: ObservationService} // TODO: uncomment when have observation service
}

export const validatorConfig = {
  ['$SFHIR_ALLERGY_INTOLERANCE_V1']: {
    clazz: SFHIRAllergyIntoleranceV1Validator,
    priority: 1,
  },
  ['$SFHIR_PATIENT_V1']: { clazz: SFHIRPatientV1Validator, priority: 1 },
  ['$SFHIR_CARE_PLAN_V1']: { clazz: SFHIRCarePlanV1Validator, priority: 1 },
  ['$SFHIR_DIAGNOSTIC_REPORT_V1']: {
    clazz: SFHIRDiagnosticReportV1Validator,
    priority: 1,
  },
  ['$SFHIR_ENCOUNTER_V1']: { clazz: SFHIREncounterV1Validator, priority: 1 },
  ['$SFHIR_OBSERVATION_V1']: {
    clazz: SFHIRObservationV1Validator,
    priority: 1,
  },
  ['$SFHIR_ORGANIZATION_V1']: {
    clazz: SFHIROrganizationV1Validator,
    priority: 1,
  },
}

export const adapterConfig = {
  ['$DEVELOP']: { clazz: DevelopmentAdapter },
}
