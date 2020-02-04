import DevelopmentAdapter from '@adapters/DevelopmentAdapter'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import ClaimService from '@services/ClaimService'
import ConditionService from '@services/ConditionService'
import DiagnosticReportService from '@services/DiagnosticReportService'
import EncounterService from '@services/EncounterService'
import ImagingStudyService from '@services/ImagingStudyService'
import ImmunizationService from '@services/ImmunizationService'
import MedicationRequestService from '@services/MedicationRequestService'
import ObservationService from '@services/ObservationService'
import PatientService from '@services/PatientService'
import ProcedureService from '@services/ProcedureService'
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
import SFHIRProcedureV1Validator from '@validators/standard/sfhir/SFHIRProcedureV1Validator'
import diagnostic_report_embedded_config from './diagnostic_report_embedded_config'
import patientEmbeddedWidgetConfig, {
  allergyIntoleranceCriticalityOption,
  allergyIntoleranceTypeOption,
  conditionClinicalStatusOption,
  conditionVerificationStatusOption,
  encounterStatusOption,
  immunizationStatusOption,
  medicationRequestStatusOption,
  claimStatusOption,
  carePlanStatusOption,
} from './patient_embedded_config'
import CarePlanService from '@services/CarePlanService'
import { observationWidgetConfig } from './observation_embedded_config'

export interface IWidgetPatameter {
  type: 'text' | 'boolean' | 'number' | 'options'
  label: string
  value: any
  defaultValue?: any
  choices?: any[]
}

export interface IWidgetGroup {
  label: string
  child: IWidgetChild[]
  value: string
  parameters?: IWidgetPatameter[]
  queryParams?: IWidgetPatameter[]
}

export interface IWidgetChild {
  label: string
  value: string
  document?: string
  path?: string
  pathType?: 'url' | 'static'
  parameters?: IWidgetPatameter[]
  queryParams?: IWidgetPatameter[]
}

export const serviceConfig = {
  ['$ALLERGY_INTOLERANCE']: { clazz: AllergyIntoleranceService },
  ['$DIAGNOSTIC_REPORT']: { clazz: DiagnosticReportService },
  ['$ENCOUNTER']: { clazz: EncounterService },
  ['$PATIENT']: { clazz: PatientService },
  ['$OBSERVATION']: { clazz: ObservationService },
  ['$CLAIM']: { clazz: ClaimService },
  ['$CONDITION']: { clazz: ConditionService },
  ['$IMAGING_STUDY']: { clazz: ImagingStudyService },
  ['$IMMUNIZATION']: { clazz: ImmunizationService },
  ['$PROCEDURE']: { clazz: ProcedureService },
  ['$MEDICATION_REQUEST']: { clazz: MedicationRequestService },
  ['$CARE_PLAN']: { clazz: CarePlanService },
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
  ['$SFHIR_CLAIM_V1']: {
    clazz: SFHIRClaimV1Validator,
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
    conditionClinicalStatusOption,
    conditionVerificationStatusOption,
    encounterStatusOption,
    immunizationStatusOption,
    medicationRequestStatusOption,
    claimStatusOption,
    carePlanStatusOption,
  },
}

export const widgetGalleryPatientConfig: IWidgetGroup = patientEmbeddedWidgetConfig

export const widgetGalleryDiagnosticReportConfig: IWidgetGroup = diagnostic_report_embedded_config

export const widgetGalleryObservationConfig: IWidgetGroup = observationWidgetConfig

export const widgetGalleryAllergyIntoleranceConfig: IWidgetGroup = {
  child: [
    {
      document: require('@assets/embedded-widget/medical-record/allergy-intolerance-card.md')
        .default,
      label: 'Allergy Intolerance',
      path: '/embedded-widget/medical-records/allergy-intolerance-card',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient Id',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient Id',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
      ],
      value: 'allergy-intolerance-card',
    },
  ],
  label: 'Allergy Intolerance',
  value: 'allergy-intolerance-card',
}
export const widgetGalleryEncounterConfig: IWidgetGroup = {
  child: [
    {
      document: require('@assets/embedded-widget/medical-record/medical-record.md')
        .default,
      label: 'Medical Records',
      path: '/embedded-widget/medical-records',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter ID',
          type: 'text',
          value: 'encounterId',
        },

        {
          choices: [
            { value: '3x3', label: '3x3' },
            { value: '2xN', label: '2xN' },
            { value: '1xN', label: '1xN' },
          ],
          defaultValue: '1xN',
          label: 'Dimention',
          type: 'options',
          value: 'dimention',
        },
      ],
      value: 'encounte-medical-records',
    },
  ],
  label: 'Medical Records',
  value: 'encounte-medical-records',
}
