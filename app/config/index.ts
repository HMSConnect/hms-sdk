import DevelopmentAdapter from '@adapters/DevelopmentAdapter'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import ConditionService from '@services/ConditionService'
import DiagnosticReportService from '@services/DiagnosticReportService'
import EncounterService from '@services/EncounterService'
import ImmunizationService from '@services/ImmunizationService'
import MedicationRequestService from '@services/MedicationRequestService'
import ObservationService from '@services/ObservationService'
import PatientService from '@services/PatientService'
import ProcedureService from '@services/ProcedureService'
import SFHIRAllergyIntoleranceV1Validator from '@validators/standard/sfhir/SFHIRAllergyIntoleranceV1Validator'
import SFHIRCarePlanV1Validator from '@validators/standard/sfhir/SFHIRCarePlanV1Validator'
import SFHIRConditionV1Validator from '@validators/standard/sfhir/SFHIRConditionV1Validator'
import SFHIRDiagnosticReportV1Validator from '@validators/standard/sfhir/SFHIRDiagnosticReportV1Validator'
import SFHIREncounterV1Validator from '@validators/standard/sfhir/SFHIREncounterV1Validator'
import SFHIRImmunizationV1Validator from '@validators/standard/sfhir/SFHIRImmunizationV1Validator'
import SFHIRMedicationRequestV1Validator from '@validators/standard/sfhir/SFHIRMedicationRequestV1Validator'
import SFHIRObservationV1Validator from '@validators/standard/sfhir/SFHIRObservationV1Validator'
import SFHIROrganizationV1Validator from '@validators/standard/sfhir/SFHIROrganizationV1Validator'
import SFHIRPatientV1Validator from '@validators/standard/sfhir/SFHIRPatientV1Validator'
import SFHIRProcedureV1Validator from '@validators/standard/sfhir/SFHIRProcedureV1Validator'
import patientEmbeddedConfig from './patient_embedded_config'
import diagnostic_report_embedded_config from './diagnostic_report_embedded_config'

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
  parameters?: IWidgetPatameter[]
  queryParams?: IWidgetPatameter[]
}

export const serviceConfig = {
  ['$ALLERGY_INTOLERANCE']: { clazz: AllergyIntoleranceService },
  ['$DIAGNOSTIC_REPORT']: { clazz: DiagnosticReportService },
  ['$ENCOUNTER']: { clazz: EncounterService },
  ['$PATIENT']: { clazz: PatientService },
  ['$OBSERVATION']: { clazz: ObservationService },
  ['$CONDITION']: { clazz: ConditionService },
  ['$IMMUNIZATION']: { clazz: ImmunizationService },
  ['$PROCEDURE']: { clazz: ProcedureService },
  ['$MEDICATION_REQUEST']: { clazz: MedicationRequestService },
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
  ['$SFHIR_CONDITION_V1']: {
    clazz: SFHIRConditionV1Validator,
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

export const widgetGalleryPatientConfig: IWidgetGroup = patientEmbeddedConfig

export const widgetGalleryDiagnosticReportConfig: IWidgetGroup = diagnostic_report_embedded_config

export const widgetGalleryObservationLaboratoryConfig: IWidgetGroup = {
  child: [
    {
      document: require('@assets/embedded-widget/medical-record/observation-laboratory-card.md')
        .default,
      label: 'Observation - Laboraory',
      path: '/embedded-widget/medical-records/observation-laboratory-card',
      queryParams: [
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter Id',
          type: 'text',
          value: 'encounterId',
        },
      ],
      value: 'observation-laboratory-card',
    },
  ],
  label: 'Observation - Laboraory',
  value: 'observation-laboratory-card',
}
export const widgetGalleryObservationVitalSignConfig: IWidgetGroup = {
  child: [
    {
      document: require('@assets/embedded-widget/medical-record/observation-vital-sign-card.md')
        .default,
      label: 'Observation - VitalSign',
      path: '/embedded-widget/medical-records/observation-vital-sign-card',
      queryParams: [
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter Id',
          type: 'text',
          value: 'encounterId',
        },
      ],
      value: 'observation-vital-sign-card',
    },
  ],
  label: 'Observation - VitalSign',
  value: 'observation-vital-sign-card',
}
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
