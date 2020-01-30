import { IWidgetGroup } from '@config'

export const observationWidgetConfig: IWidgetGroup = {
  child: [
    {
      document: require('@assets/embedded-widget/observation/observation-blood-pressure-card.md')
        .default,
      label: 'Observation Blood Pressure Card',
      parameters: [],
      path: '/embedded-widget/observation/blood-pressure-card',
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
      ],
      value: 'observation-blood-pressure-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-temperature-card.md')
        .default,
      label: 'Observation Temperature Card',
      parameters: [],
      path: '/embedded-widget/observation/temperature-card',
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
      ],
      value: 'observation-temperature-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-body-measurement-card.md')
        .default,
      label: 'Observation Body Measurement Card',
      parameters: [],
      path: '/embedded-widget/observation/body-measurement-card',
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
      ],
      value: 'observation-body-measurement-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-heartbeat-card.md')
        .default,
      label: 'Observation Heartbeat Card',
      parameters: [],
      path: '/embedded-widget/observation/heartbeat-card',
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
      ],
      value: 'observation-heartbeat-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-blood-pressure-graph.md')
        .default,
      label: 'Observaion Blood Pressure Graph',
      parameters: [],
      path: '/embedded-widget/observation/blood-pressure-graph',
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
      ],
      value: 'observaion-blood-pressure-graph',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-body-height-graph.md')
        .default,
      label: 'Observaion Body Height Graph',
      parameters: [],
      path: '/embedded-widget/observation/body-height-graph',
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
      ],
      value: 'observaion-body-height-graph',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-body-weight-graph.md')
        .default,
      label: 'Observaion Body Weight Graph',
      parameters: [],
      path: '/embedded-widget/observation/body-weight-graph',
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
      ],
      value: 'observaion-body-weight-graph',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-laboratory-table.md')
        .default,
      label: 'Observaion Laboratory Table',
      parameters: [],
      path: '/embedded-widget/observation/laboratory-table',
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
      ],
      value: 'patient-observaion-laboratory-table',
    },
    {
      document: require('@assets/embedded-widget/medical-record/observation-laboratory-card.md')
        .default,
      label: 'Observation - Laboraory',
      path: '/embedded-widget/observation/laboratory-card',
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
      path: '/embedded-widget/observation/vital-sign-card',
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
