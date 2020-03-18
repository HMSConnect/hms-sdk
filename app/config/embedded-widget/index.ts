import { IWidgetGroup } from '@config'
import { observationWidgetConfig } from '@config/embedded-widget/observation_embedded_config'
import diagnostic_report_embedded_config from './diagnostic_report_embedded_config'
import patientEmbeddedWidgetConfig from './patient_embedded_config'

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
