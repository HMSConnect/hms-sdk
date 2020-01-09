import DevelopmentAdapter from '@adapters/DevelopmentAdapter'
import DiagnosticReportService from '@services/DiagnosticReportService'
import EncounterService from '@services/EncounterService'
import PatientService from '@services/PatientService'
import SFHIRCarePlanV1Validator from '@validators/standard/sfhir/SFHIRCarePlanV1Validator'
import SFHIRDiagnosticReportV1Validator from '@validators/standard/sfhir/SFHIRDiagnosticReportV1Validator'
import SFHIREncounterV1Validator from '@validators/standard/sfhir/SFHIREncounterV1Validator'
import SFHIRObservationV1Validator from '@validators/standard/sfhir/SFHIRObservationV1Validator'
import SFHIROrganizationV1Validator from '@validators/standard/sfhir/SFHIROrganizationV1Validator'
import SFHIRPatientV1Validator from '@validators/standard/sfhir/SFHIRPatientV1Validator'

export interface IWidgetPatameter {
  type: 'text' | 'boolean' | 'number' | 'options'
  label: string
  value: any
  defaultValue: any
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
  ['$PATIENT']: { clazz: PatientService },
  ['$ENCOUNTER']: { clazz: EncounterService },
  ['$DIAGNOSTIC_REPORT']: { clazz: DiagnosticReportService },
  // ['$OBSERVATION']: { clazz: ObservationService} // TODO: uncomment when have observation service
}

export const validatorConfig = {
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

export const widgetGalleryPatientConfig: IWidgetGroup = {
  child: [
    {
      document: require('@assets/embedded-widget/patient-search.md').default,
      label: 'Patient Search',
      path: '/embedded-widget/patient-search',
      queryParams: [
        { type: 'number', label: 'Max', value: 'max', defaultValue: 10 },
        { type: 'number', label: 'Offset', value: 'offset', defaultValue: 0 },
        { type: 'number', label: 'Page', value: 'page', defaultValue: 0 },
        {
          choices: [
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
          ],
          defaultValue: 'all',
          label: 'Filter[gender]',
          type: 'options',
          value: 'filter[gender]',
        },
        {
          defaultValue: '',
          label: 'Filter[searchText]',
          type: 'text',
          value: 'filter[searchText]',
        },
        {
          choices: [
            {
              label: 'Asc',
              value: 'asc',
            },
            {
              label: 'Desc',
              value: 'desc',
            },
          ],
          defaultValue: 'asc',
          label: 'Sort[order]',
          type: 'options',
          value: 'sort[order]',
        },
        {
          defaultValue: 'id',
          label: 'Sort[orderBy]',
          type: 'text',
          value: 'sort[orderBy]',
        },
      ],
      value: 'patient-search',
    },
    {
      document: require('@assets/embedded-widget/patient-search-bar.md')
        .default,
      label: 'Patient Search Bar',
      path: '/embedded-widget/patient-search-bar',
      queryParams: [
        { type: 'number', label: 'Max', value: 'max', defaultValue: 10 },
        { type: 'number', label: 'Offset', value: 'offset', defaultValue: 0 },
        { type: 'number', label: 'Page', value: 'page', defaultValue: 0 },
        {
          choices: [
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
          ],
          defaultValue: 'all',
          label: 'Filter[gender]',
          type: 'options',
          value: 'filter[gender]',
        },
        {
          defaultValue: '',
          label: 'Filter[searchText]',
          type: 'text',
          value: 'filter[searchText]',
        },
      ],
      value: 'patient-search-bar',
    },
    {
      document: require('@assets/embedded-widget/patient-search-result.md')
        .default,
      label: 'Patient Search Result',
      path: '/embedded-widget/patient-search-result',
      queryParams: [
        { type: 'number', label: 'Max', value: 'max', defaultValue: 10 },
        { type: 'number', label: 'Offset', value: 'offset', defaultValue: 0 },
        { type: 'number', label: 'Page', value: 'page', defaultValue: 0 },
        {
          choices: [
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
          ],
          defaultValue: 'all',
          label: 'Filter[gender]',
          type: 'options',
          value: 'filter[gender]',
        },
        {
          defaultValue: '',
          label: 'Filter[searchText]',
          type: 'text',
          value: 'filter[searchText]',
        },
        {
          choices: [
            {
              label: 'Asc',
              value: 'asc',
            },
            {
              label: 'Desc',
              value: 'desc',
            },
          ],
          defaultValue: 'asc',
          label: 'Sort[order]',
          type: 'options',
          value: 'sort[order]',
        },
        {
          defaultValue: 'id',
          label: 'Sort[orderBy]',
          type: 'text',
          value: 'sort[orderBy]',
        },
      ],
      value: 'patient-search-result',
    },
    {
      document: require('@assets/embedded-widget/patient-info.md').default,
      label: 'Patient Info',
      parameters: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path: '/embedded-widget/patient-info/:patientId',
      queryParams: [
        {
          defaultValue: 'encounter',
          label: 'Menu Navigate',
          type: 'text',
          value: 'menuNavigate',
        },
      ],
      value: 'patient-info',
    },
    {
      document: require('@assets/embedded-widget/patient-encounter-timeline.md')
        .default,
      label: 'Patine Encounter Timeline',
      parameters: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path: '/embedded-widget/patient-info/encounter-timeline/:patientId',
      queryParams: [
        {
          defaultValue: 10,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
      ],
      value: 'patient-encounter-timeline',
    },
  ],
  label: 'Patient',
  value: 'patient',
}

export const widgetGalleryDiagnosticReportConfig: IWidgetGroup = {
  child: [
    {
      document: `# Comming Soon ...`,
      label: 'Simple Diangnositc Report Card',
      path: '/embedded-widget/medical-records/diagnostic-report-card',
      queryParams: [
        {
          defaultValue: 'cca7e86a-14de-417c-9d16-ac992f0629c9',
          label: 'Filter[id]',
          type: 'text',
          value: 'id',
        },
      ],
      value: 'simple-diagnostic-report-card',
    },
    {
      document: `# Comming Soon ...`,
      label: 'Diangnositc Report Card',
      path: '/embedded-widget/medical-records/diagnostic-report-card',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Filter[patientId]',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Filter[Encounter ID]',
          type: 'text',
          value: 'encounterId',
        },
        {
          defaultValue: true,
          label: 'Is Include Modal',
          type: 'boolean',
          value: 'isIncludeModal',
        },
      ],
      value: 'diagnostic-report-card',
    },
  ],
  label: 'DiagnosticReport',
  value: 'diagnostic-report-card',
}
export const widgetGalleryEncounterConfig: IWidgetGroup = {
  child: [
    {
      document: `# Comming Soon ...`,
      label: 'Medical-records',
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
          defaultValue: '2xN',
          label: 'Dimention',
          type: 'options',
          value: 'dimention',
        },
      ],
      value: 'encounte-medical-records',
    },
  ],
  label: 'Encounter',
  value: 'encounte-medical-records',
}
