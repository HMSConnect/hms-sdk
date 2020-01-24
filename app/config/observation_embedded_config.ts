import { IWidgetGroup } from '@config'

export const observationWidgetConfig: IWidgetGroup = {
  child: [
    {
      document: `# Coming soon`,
      label: 'Observation Blood Pressure Card',
      parameters: [
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
      ],
      path:
        '/embedded-widget/observation/:patientId/encounter/:encounterId/blood-pressure-card',
      queryParams: [],
      value: 'observation-blood-pressure-card',
    },
    {
      document: `# Coming soon`,
      label: 'Observation Temperature Card',
      parameters: [
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
      ],
      path:
        '/embedded-widget/observation/:patientId/encounter/:encounterId/temperature-card',
      queryParams: [],
      value: 'observation-temperature-card',
    },
    {
      document: `# Coming soon`,
      label: 'Observation Body Measurement Card',
      parameters: [
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
      ],
      path:
        '/embedded-widget/observation/:patientId/encounter/:encounterId/body-measurement-card',
      queryParams: [],
      value: 'observation-body-measurement-card',
    },
    {
      document: `# Coming soon`,
      label: 'Observation Heartbeat Card',
      parameters: [
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
      ],
      path:
        '/embedded-widget/observation/:patientId/encounter/:encounterId/heartbeat-card',
      queryParams: [],
      value: 'observation-heartbeat-card',
    },
    {
      document: `# Coming soon`,
      label: 'Observaion Blood Pressure Graph',
      parameters: [
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
      ],
      path:
        '/embedded-widget/observation/:patientId/encounter/:encounterId/observation-blood-pressure-graph',
      queryParams: [],
      value: 'observaion-blood-pressure-graph',
    },
    {
      document: `# Coming soon`,
      label: 'Observaion Body Height Graph',
      parameters: [
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
      ],
      path:
        '/embedded-widget/observation/:patientId/encounter/:encounterId/observation-body-height-graph',
      queryParams: [],
      value: 'observaion-body-height-graph',
    },
    {
      document: `# Coming soon`,
      label: 'Observaion Body Weight Graph',
      parameters: [
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
      ],
      path:
        '/embedded-widget/observation/:patientId/encounter/:encounterId/observation-body-weight-graph',
      queryParams: [],
      value: 'observaion-body-weight-graph',
    },
    {
      document: `# Coming soon`,
      label: 'Observaion Laboratory Table',
      parameters: [
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
      ],
      path:
        '/embedded-widget/observation/:patientId/encounter/:encounterId/observation-laboratory-table',
      queryParams: [],
      value: 'patient-observaion-laboratory-table',
    },
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
  label: 'Observation - Laboraory',
  value: 'observation-laboratory-card',
}
