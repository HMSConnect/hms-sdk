import ValidatorManager from '../../validators/ValidatorManager'

function registerValidators(validators: string[]) {
  validators.forEach(validatorName => {
    if (!ValidatorManager.isExist(validatorName)) {
      switch (validatorName) {
        case 'SFHIR_PATIENT_V1':
          require('../../validators/standard/sfhir/SFHIRPatientV1Validator')
          break
        case 'SFHIR_CARE_PLAN_V1':
          require('../../validators/standard/sfhir/SFHIRCarePlanV1Validator')
          break
        case 'SFHIR_DIAGNOSTIC_REPORT_V1':
          require('../../validators/standard/sfhir/SFHIRDiagnosticReportV1Validator')
          break
        case 'SFHIR_ENCOUNTER_V1':
          require('../../validators/standard/sfhir/SFHIREncounterV1Validator')
          break
        case 'SFHIR_OBSERVATION_V1':
          require('../../validators/standard/sfhir/SFHIRObservationV1Validator')
          break
        case 'SFHIR_ORGANIZATION_V1':
          require('../../validators/standard/sfhir/SFHIROrganizationV1Validator')
          break
        case 'SFHIR_PATIENT_V1':
          require('../../validators/standard/sfhir/SFHIRPatientV1Validator')
          break
        default:
          break
      }
    }
  })
}

export default registerValidators
