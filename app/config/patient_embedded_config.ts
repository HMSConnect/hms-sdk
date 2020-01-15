import { IWidgetGroup } from '@config'

export default {
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
          choices: [
            { label: 'care plan', value: 'care_plan' },
            { label: 'condition', value: 'condition' },
            { label: 'diagnostic report', value: 'diagnostic_report' },
            { label: 'encounter', value: 'encounter' },
            { label: 'medication request', value: 'medication_request' },
            { label: 'observation', value: 'observation' },
            { label: 'patient', value: 'patient' },
            { label: 'procedure', value: 'procedure' },
          ],
          defaultValue: 'encounter',
          label: 'Menu Navigate',
          type: 'options',
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
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
        {
          defaultValue: '',
          label: 'InitialFilter[status]',
          type: 'text',
          value: 'initialFilter[status]',
        },
      ],
      value: 'patient-encounter-timeline',
    },
    {
      document: `# Coming Soon`,
      label: 'Patine AllergyIntolerance Table',
      parameters: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path:
        '/embedded-widget/patient-info/allergy-intolerance-table/:patientId',
      queryParams: [
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
        {
          defaultValue: '',
          label: 'InitialFilter[codeText]',
          type: 'text',
          value: 'InitialFilter[codeText]',
        },
        {
          choices: [
            { label: 'Allergy', value: 'allergy' },
            { label: 'Intolerance', value: 'intolerance' },
          ],
          defaultValue: '',
          label: 'InitialFilter[type]',
          type: 'options',
          value: 'initialFilter[type]',
        },
        {
          choices: [
            { label: 'Low', value: 'low' },
            { label: 'High', value: 'high' },
            { label: 'Unable to Assess Risk', value: 'unable-to-assess' },
          ],
          defaultValue: '',
          label: 'InitialFilter[criticality]',
          type: 'options',
          value: 'initialFilter[criticality]',
        },
      ],
      value: 'patient-allergy-intolerance-table',
    },
    {
      document: `# Coming Soon`,
      label: 'Patine Condition Table',
      parameters: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path: '/embedded-widget/patient-info/condition-table/:patientId',
      queryParams: [
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
        {
          defaultValue: '',
          label: 'InitialFilter[codeText]',
          type: 'text',
          value: 'initialFilter[codeText]',
        },
        {
          choices: [
            {
              label: 'Active',
              value: 'active',
            },
            {
              label: 'Recurrence',
              value: 'recurrence',
            },
            {
              label: 'Relapse',
              value: 'relapse',
            },
            {
              label: 'Inactive',
              value: 'inactive',
            },
            {
              label: 'Remission',
              value: 'remission',
            },
            {
              label: 'Resolved',
              value: 'resolved',
            },
          ],
          defaultValue: '',
          label: 'InitialFilter[clinicalStatus]',
          type: 'options',
          value: 'initialFilter[clinicalStatus]',
        },
        {
          choices: [
            {
              label: 'Unconfirmed',
              value: 'unconfirmed',
            },
            {
              label: 'Provisional',
              value: 'provisional',
            },
            {
              label: 'Differential',
              value: 'differential',
            },
            {
              label: 'Confirmed',
              value: 'confirmed',
            },
            {
              label: 'Refuted',
              value: 'refuted',
            },
            {
              label: 'Entered in Error',
              value: 'entered-in-error',
            },
          ],
          defaultValue: '',
          label: 'InitialFilter[verificationStatus]',
          type: 'options',
          value: 'initialFilter[verificationStatus]',
        },
      ],
      value: 'patient-condition-table',
    },
    {
      document: `# Coming Soon`,
      label: 'Patine Immunization Table',
      parameters: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path: '/embedded-widget/patient-info/immunization-table/:patientId',
      queryParams: [
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
        {
          defaultValue: 20,
          label: 'InitialFilter[vaccineCode]',
          type: 'text',
          value: 'initialFilter[vaccineCode]',
        },
        {
          choices: [
            {
              label: 'Completed',
              value: 'completed',
            },
            {
              label: 'Entered in Error',
              value: 'entered-in-error',
            },
            {
              label: 'Not Done',
              value: 'not-done',
            },
          ],
          defaultValue: '',
          label: 'InitialFilter[status]',
          type: 'options',
          value: 'initialFilter[status]',
        },
      ],
      value: 'patient-immunization-table',
    },
    {
      document: `# Coming Soon`,
      label: 'Patine Medication Request Table',
      parameters: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path: '/embedded-widget/patient-info/medication-request-table/:patientId',
      queryParams: [
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
        {
          defaultValue: '',
          label: 'InitialFilter[medicationCodeableConcept]',
          type: 'text',
          value: 'initialFilter[medicationCodeableConcept]',
        },
        {
          choices: [
            {
              label: 'Acitve',
              value: 'active',
            },
            {
              label: 'On Hold',
              value: 'on-hold',
            },
            {
              label: 'Cancelled',
              value: 'cancelled',
            },
            {
              label: 'Completed',
              value: 'completed',
            },
            {
              label: '	Entered in Error',
              value: 'entered-in-error',
            },
            {
              label: 'Stopped',
              value: 'stopped',
            },
            {
              label: 'Draft',
              value: 'draft',
            },
            {
              label: 'Unknown',
              value: 'unknown',
            },
          ],
          defaultValue: '',
          label: 'InitialFilter[status]',
          type: 'options',
          value: 'initialFilter[status]',
        },
      ],
      value: 'patient-medication-request-table',
    },
    {
      document: `# Coming Soon`,
      label: 'Patine Procedure Table',
      parameters: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path: '/embedded-widget/patient-info/procedure-table/:patientId',
      queryParams: [
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
        {
          defaultValue: '',
          label: 'InitialFilter[code]',
          type: 'text',
          value: 'initialFilter[code]',
        },
      ],
      value: 'patient-procedure-table',
    },
  ],
  label: 'Patient',
  value: 'patient',
} as IWidgetGroup
