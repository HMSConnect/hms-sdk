import DevelopmentAdapter from '@adapters/DevelopmentAdapter'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import AllergyService from '@services/AllergyService'
import CarePlanService from '@services/CarePlanService'
import ClaimService from '@services/ClaimService'
import ConditionService from '@services/ConditionService'
import DiagnosisService from '@services/DiagnosisService'
import DiagnosticReportService from '@services/DiagnosticReportService'
import EncounterService from '@services/EncounterService'
import HMSAppointmentService from '@services/hms/HMSAppoinmentService'
import HMSLaboratoryService from '@services/hms/HMSLaboratoryService'
import HMSObservationService from '@services/hms/HMSObservationService'
import HMSVitalSignService from '@services/hms/HMSVitalSignService'
import ImagingStudyService from '@services/ImagingStudyService'
import ImmunizationService from '@services/ImmunizationService'
import MedicationRequestService from '@services/MedicationRequestService'
import ObservationService from '@services/ObservationService'
import PatientService from '@services/PatientService'
import PractitionerService from '@services/PractitionerService'
import ProcedureService from '@services/ProcedureService'
import HMSAllergyV24XValidator from '@validators/standard/hms/2.4/HMSAllergyV24XValidator'
import HMSAppointmentV24XValidator from '@validators/standard/hms/2.4/HMSAppointmentV24XValidator'
import HMSCarePlanV24XValidator from '@validators/standard/hms/2.4/HMSCarePlanV24XValidator'
import HMSConditionV24XValidator from '@validators/standard/hms/2.4/HMSConditionV24XValidator'
import HMSDiagnosisV24XValidator from '@validators/standard/hms/2.4/HMSDiagnosisV24XValidator'
import HMSEncounterV24XValidator from '@validators/standard/hms/2.4/HMSEncounterV24XValidator'
import HMSLaboratoryV24XValidator from '@validators/standard/hms/2.4/HMSLaboratoryV24XValidator'
import HMSMedicationRequestV24xValidator from '@validators/standard/hms/2.4/HMSMedicationRequestV24xValidator'
import HMSPatientV24XValidator from '@validators/standard/hms/2.4/HMSPatientV24XValidator'
import HMSPractitionerV24XValidator from '@validators/standard/hms/2.4/HMSPractitionerV24XValidator'
import HMSProcedureV24XValidator from '@validators/standard/hms/2.4/HMSProcedureV24XValidator'
import HMSVitalSignV24XValidator from '@validators/standard/hms/2.4/HMSVitalSignV24XValidator'
import SFHIRAllergyIntoleranceV1Validator from '@validators/standard/sfhir/SFHIRAllergyIntoleranceV1Validator'
import SFHIRCarePlanV1Validator from '@validators/standard/sfhir/SFHIRCarePlanV1Validator'
import SFHIRClaimV1Validator from '@validators/standard/sfhir/SFHIRClaimV1Validator'
import SFHIRConditionV1Validator from '@validators/standard/sfhir/SFHIRConditionV1Validator'
import SFHIRDiagnosticReportV1Validator from '@validators/standard/sfhir/SFHIRDiagnosticReportV1Validator'
import SFHIREncounterV1Validator from '@validators/standard/sfhir/SFHIREncounterV1Validator'
import SFHIRImagingStudyV1Validator from '@validators/standard/sfhir/SFHIRImagingStudyV1Validator'
import SFHIRImmunizationV1Validator from '@validators/standard/sfhir/SFHIRImmunizationV1Validator'
import SFHIRMedicationRequestV1Validator from '@validators/standard/sfhir/SFHIRMedicationRequestV1Validator'
import SFHIRObservationV1Validator from '@validators/standard/sfhir/SFHIRObservationV1Validator'
import SFHIROrganizationV1Validator from '@validators/standard/sfhir/SFHIROrganizationV1Validator'
import SFHIRPatientV1Validator from '@validators/standard/sfhir/SFHIRPatientV1Validator'
import SFHIRPractitionerV1Validator from '@validators/standard/sfhir/SFHIRPractitionerV1Validator'
import SFHIRProcedureV1Validator from '@validators/standard/sfhir/SFHIRProcedureV1Validator'
import {
  allergyIntoleranceCriticalityOption,
  allergyIntoleranceTypeOption,
  carePlanStatusOption,
  claimStatusOption,
  conditionClinicalStatusOption,
  conditionVerificationStatusOption,
  encounterStatusOption,
  immunizationStatusOption,
  medicationRequestStatusOption,
} from './patient'

export interface IWidgetPatameter {
  type: 'text' | 'boolean' | 'number' | 'options'
  label: string
  value: any
  defaultValue?: any
  choices?: any[]
}

export interface IWidgetStructure {
  name: string
  structure: IWidgetPatameter[]
}

export interface IWidgetGroup {
  label: string
  child: IWidgetChild[]
  value: string
  parameters?: IWidgetPatameter[]
  queryParams?: IWidgetPatameter[]
  structure?: IWidgetStructure[]
}

export interface IWidgetChild {
  label: string
  value: string
  document?: string
  path?: string
  pathType?: 'url' | 'static'
  parameters?: IWidgetPatameter[]
  queryParams?: IWidgetPatameter[]
  structure?: IWidgetStructure[]
}

export const serviceConfig = {
  ['$ALLERGY_INTOLERANCE']: { clazz: AllergyIntoleranceService },
  ['$ALLERGY']: { clazz: AllergyService },
  ['$CARE_PLAN']: { clazz: CarePlanService },
  ['$CLAIM']: { clazz: ClaimService },
  ['$CONDITION']: { clazz: ConditionService },
  ['$DIAGNOSIS']: { clazz: DiagnosisService },
  ['$DIAGNOSTIC_REPORT']: { clazz: DiagnosticReportService },
  ['$ENCOUNTER']: { clazz: EncounterService },
  ['$HMS_APPOINTMENT']: { clazz: HMSAppointmentService,resource: 'appointment' },
  ['$HMS_CARE_PLAN']: { clazz: CarePlanService, resource: 'careplan' },
  ['$HMS_LABORATORY']: { clazz: HMSLaboratoryService },
  ['$HMS_MEDICATION_DISPENSE']: { clazz: MedicationRequestService, resource: 'medicationdispense'},
  ['$HMS_OBSERVATION']: { clazz: HMSObservationService },
  ['$HMS_VITAL_SIGN']: { clazz: HMSVitalSignService },
  ['$IMAGING_STUDY']: { clazz: ImagingStudyService },
  ['$IMMUNIZATION']: { clazz: ImmunizationService },
  ['$MEDICATION_REQUEST']: { clazz: MedicationRequestService },
  ['$OBSERVATION']: { clazz: ObservationService },
  ['$PATIENT']: { clazz: PatientService },
  ['$PRACTITIONER']: { clazz: PractitionerService },
  ['$PROCEDURE']: { clazz: ProcedureService },
}

export const validatorConfig = {
  ['$HMS_VITAL_SIGN_V2.4x']: { clazz: HMSVitalSignV24XValidator, priority: 2 },
  ['$HMS_LABORATORY_V2.4x']: { clazz: HMSLaboratoryV24XValidator, priority: 2 },
  ['$SFHIR_ALLERGY_INTOLERANCE_V1']: {
    clazz: SFHIRAllergyIntoleranceV1Validator,
    priority: 1,
  },
  ['$HMS_APPOINTMENT_V2.4x']: { clazz: HMSAppointmentV24XValidator, priority: 1 },
  ['$HMS_ALLERGY_V2.4x']: { clazz: HMSAllergyV24XValidator, priority: 1 },
  ['$SFHIR_PATIENT_V1']: { clazz: SFHIRPatientV1Validator, priority: 1 },
  ['$HMS_PATIENT_V2.4x']: { clazz: HMSPatientV24XValidator, priority: 1 },
  ['$HMS_ENCOUNTER_V2.4x']: { clazz: HMSEncounterV24XValidator, priority: 1 },
  ['$SFHIR_CARE_PLAN_V1']: { clazz: SFHIRCarePlanV1Validator, priority: 1 },
  ['$HMS_CARE_PLAN_V2.4x']: { clazz: HMSCarePlanV24XValidator, priority: 1 },
  ['$HMS_DIAGNOSIS_V2.4x']: { clazz: HMSDiagnosisV24XValidator, priority: 1 },
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
  ['$SFHIR_PRACTITIONER_V1']: {
    clazz: SFHIRPractitionerV1Validator,
    priority: 1,
  },
  ['$HMS_PRACTITIONER_V2.4X']: {
    clazz: HMSPractitionerV24XValidator,
    priority: 2,
  },
  ['$SFHIR_CLAIM_V1']: {
    clazz: SFHIRClaimV1Validator,
    priority: 1,
  },
  ['$HMS_CONDITION_V2.4x']: {
    clazz: HMSConditionV24XValidator,
    priority: 1,
  },
  ['$SFHIR_CONDITION_V1']: {
    clazz: SFHIRConditionV1Validator,
    priority: 1,
  },
  ['$SFHIR_IMAGING_STUDY_V1']: {
    clazz: SFHIRImagingStudyV1Validator,
    priority: 1,
  },
  ['$SFHIR_IMMUNIZATION_V1']: {
    clazz: SFHIRImmunizationV1Validator,
    priority: 1,
  },
  ['$SFHIR_PROCEDURE_V1']: {
    clazz: SFHIRProcedureV1Validator,
    priority: 1,
  },
  ['$HMS_PROCEDURE_V2.4x']: {
    clazz: HMSProcedureV24XValidator,
    priority: 1,
  },
  ['$HMS_MEDICATION_REQUEST_V2.4x']: {
    clazz: HMSMedicationRequestV24xValidator,
    priority: 1,
  },
  ['$SFHIR_MEDICATION_REQUEST_V1']: {
    clazz: SFHIRMedicationRequestV1Validator,
    priority: 1,
  },
}

export const adapterConfig = {
  ['$DEVELOP']: { clazz: DevelopmentAdapter },
}

export const noneOption = { label: 'None', value: '' }
export const selectOptions = {
  patient: {
    allergyIntoleranceCriticalityOption,
    allergyIntoleranceTypeOption,
    carePlanStatusOption,
    claimStatusOption,
    conditionClinicalStatusOption,
    conditionVerificationStatusOption,
    encounterStatusOption,
    immunizationStatusOption,
    medicationRequestStatusOption,
  },
}
