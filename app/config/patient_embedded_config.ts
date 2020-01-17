import { IWidgetGroup } from '@config'

//////////// allergy ///////////////////

export const allergyIntoleranceType = {
  ALLERGY: 'allergy',
  INTOLERANCE: 'intolerance',
}

export const allergyIntoleranceCriticality = {
  HIGH: 'high',
  LOW: 'low',
  UNABLETOASSESS: 'unable-to-assess',
}

export const allergyIntoleranceTypeOption = [
  {
    label: 'Allergy',
    value: allergyIntoleranceType.ALLERGY,
  },
  {
    label: 'Intolerance',
    value: allergyIntoleranceType.INTOLERANCE,
  },
]

export const allergyIntoleranceCriticalityOption = [
  {
    label: 'Low',
    value: allergyIntoleranceCriticality.LOW,
  },
  {
    label: 'High',
    value: allergyIntoleranceCriticality.HIGH,
  },
  {
    label: 'Unable to Assess Risk',
    value: allergyIntoleranceCriticality.UNABLETOASSESS,
  },
]
//////////// allergy ///////////////////

///////////////// condition ///////////////////

export const conditionClinicalStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  RECURRENCE: 'recurrence',
  RELAPSE: 'relapse',
  REMISSION: 'remission',
  RESOLVE: 'resolve',
}

export const conditionVerificationStatus = {
  CONFIRMED: 'confirmed',
  PROVISIONAL: 'provisional',
  REFUTED: 'refuted',
  DIFFERENTIAL: 'differential',
  UNCONFIRMED: 'unconfirmed',
  ENTEREDINERROR: 'entered-in-error',
}

export const conditionClinicalStatusOption = [
  {
    label: 'Active',
    value: conditionClinicalStatus.ACTIVE,
  },
  {
    label: 'Recurrence',
    value: conditionClinicalStatus.RECURRENCE,
  },
  {
    label: 'Relapse',
    value: conditionClinicalStatus.RELAPSE,
  },
  {
    label: 'Inactive',
    value: conditionClinicalStatus.INACTIVE,
  },
  {
    label: 'Remission',
    value: conditionClinicalStatus.REMISSION,
  },
  {
    label: 'Resolved',
    value: conditionClinicalStatus.RESOLVE,
  },
]

export const conditionVerificationStatusOption = [
  {
    label: 'Unconfirmed',
    value: conditionVerificationStatus.UNCONFIRMED,
  },
  {
    label: 'Provisional',
    value: conditionVerificationStatus.PROVISIONAL,
  },
  {
    label: 'Differential',
    value: conditionVerificationStatus.DIFFERENTIAL,
  },
  {
    label: 'Confirmed',
    value: conditionVerificationStatus.CONFIRMED,
  },
  {
    label: 'Refuted',
    value: conditionVerificationStatus.REFUTED,
  },
  {
    label: 'Entered in Error',
    value: conditionVerificationStatus.ENTEREDINERROR,
  },
]

///////////////// condition ///////////////////

/////////////////////// encounter /////////////////////

export const encounterStatus = {
  PLANNED: 'planned',
  ARRIVED: 'arrived',
  TRIAGED: 'triaged',
  INPROGRESS: 'in-progress',
  ONLEAVE: 'onleave',
  FINISHED: 'finished',
  CANCELLED: 'cancelled',
  ENTEREDINERROR: 'entered-in-error',
  UNKNOW: 'unknow',
}

export const encounterStatusOption = [
  {
    label: 'planned',
    value: encounterStatus.PLANNED,
  },
  {
    label: 'arrived',
    value: encounterStatus.ARRIVED,
  },
  {
    label: 'triaged',
    value: encounterStatus.TRIAGED,
  },
  {
    label: 'in-progress',
    value: encounterStatus.INPROGRESS,
  },
  {
    label: 'onleave',
    value: encounterStatus.ONLEAVE,
  },
  {
    label: 'finished',
    value: encounterStatus.FINISHED,
  },
  {
    label: 'cancelled',
    value: encounterStatus.CANCELLED,
  },
  {
    label: 'entered-in-error',
    value: encounterStatus.ENTEREDINERROR,
  },
  {
    label: 'unknown',
    value: encounterStatus.UNKNOW,
  },
]

/////////////////////// encounter /////////////////////

/////////////////////// immunization /////////////////////

export const immunizationStatus = {
  COMPLETED: 'COMPLETED',
  ENTEREDINERROR: 'entered-in-error',
  NOTDONE: 'not-done',
}

export const immunizationStatusOption = [
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
]

/////////////////////// immunization /////////////////////

/////////////////////// medicationRequest /////////////////////

export const medicationRequestStatus = {
  ACTIVE: 'active',
  ONHOLD: 'on-hold',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  ENTEREDINERROR: 'entered-in-error',
  STOPPED: 'stopped',
  DRAFT: 'draft',
  UNKNOW: 'unknow',
  NOTDONE: 'not-done',
}

export const medicationRequestStatusOption = [
  {
    label: 'Acitve',
    value: medicationRequestStatus.ACTIVE,
  },
  {
    label: 'On Hold',
    value: medicationRequestStatus.ONHOLD,
  },
  {
    label: 'Cancelled',
    value: medicationRequestStatus.CANCELLED,
  },
  {
    label: 'Completed',
    value: medicationRequestStatus.COMPLETED,
  },
  {
    label: 'Entered in Error',
    value: medicationRequestStatus.ENTEREDINERROR,
  },
  {
    label: 'Stopped',
    value: medicationRequestStatus.STOPPED,
  },
  {
    label: 'Draft',
    value: medicationRequestStatus.DRAFT,
  },
  {
    label: 'Unknown',
    value: medicationRequestStatus.UNKNOW,
  },
]

/////////////////////// medicationRequest /////////////////////

/////////////////////// claim /////////////////////

export const claimStatus = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  ENTEREDINERROR: 'entered-in-error',
  DRAFT: 'draft',
}

export const claimStatusOption = [
  {
    label: 'Acitve',
    value: claimStatus.ACTIVE,
  },
  {
    label: 'Cancelled',
    value: claimStatus.CANCELLED,
  },
  {
    label: 'Entered in Error',
    value: claimStatus.ENTEREDINERROR,
  },
  {
    label: 'Draft',
    value: claimStatus.DRAFT,
  },
]

/////////////////////// claim /////////////////////

/////////////////////// carePlan /////////////////////

export const carePlanStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ONHOLD: 'on-hold',
  REVOKED: 'revoked',
  COMPLETED: 'completed',
  ENTEREDINERROR: 'entered-in-error',
  UNKNOW: 'unknow',
}

export const carePlanStatusOption = [
  {
    label: 'Draft',
    value: carePlanStatus.DRAFT,
  },
  {
    label: 'Acitve',
    value: carePlanStatus.ACTIVE,
  },
  {
    label: 'On Hold',
    value: carePlanStatus.ONHOLD,
  },
  {
    label: 'Revoked',
    value: carePlanStatus.REVOKED,
  },
  {
    label: 'Completed',
    value: carePlanStatus.COMPLETED,
  },
  {
    label: 'Entered in Error',
    value: carePlanStatus.ENTEREDINERROR,
  },

  {
    label: 'Unknown',
    value: carePlanStatus.UNKNOW,
  },
]

/////////////////////// carePlan /////////////////////

const patientEmbeddedWidgetConfig: IWidgetGroup = {
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
            {
              label: 'None',
              value: '',
            },
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
      document: require('@assets/embedded-widget/patient-allergy-intolerance-table.md')
        .default,
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
          label: 'InitialFilter[name]',
          type: 'text',
          value: 'InitialFilter[codeText]',
        },
        {
          choices: [
            {
              label: 'None',
              value: '',
            },
          ].concat(allergyIntoleranceTypeOption),
          defaultValue: '',
          label: 'InitialFilter[type]',
          type: 'options',
          value: 'initialFilter[type]',
        },
        {
          choices: [
            {
              label: 'None',
              value: '',
            },
          ].concat(allergyIntoleranceCriticalityOption),
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
          label: 'InitialFilter[name]',
          type: 'text',
          value: 'initialFilter[codeText]',
        },
        {
          choices: [
            {
              label: 'None',
              value: '',
            },
          ].concat(conditionClinicalStatusOption),
          defaultValue: '',
          label: 'InitialFilter[clinicalStatus]',
          type: 'options',
          value: 'initialFilter[clinicalStatus]',
        },
        {
          choices: [
            {
              label: 'None',
              value: '',
            },
          ].concat(conditionVerificationStatusOption),
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
          defaultValue: '',
          label: 'InitialFilter[vaccineCode]',
          type: 'text',
          value: 'initialFilter[vaccineCode]',
        },
        {
          choices: [
            {
              label: 'None',
              value: '',
            },
          ].concat(immunizationStatusOption),
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
              label: 'None',
              value: '',
            },
          ].concat(medicationRequestStatusOption),
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
    {
      document: `# Coming Soon`,
      label: 'Patine Care Plan Table',
      parameters: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path: '/embedded-widget/patient-info/care-plan-table/:patientId',
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
      value: 'patient-care-plan-table',
    },
    {
      document: `# Coming Soon`,
      label: 'Patine Claim Table',
      parameters: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path: '/embedded-widget/patient-info/claim-table/:patientId',
      queryParams: [
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
        {
          choices: [{ label: 'None', value: '' }].concat(claimStatusOption),
          defaultValue: '',
          label: 'InitialFilter[status]',
          type: 'options',
          value: 'initialFilter[status]',
        },
      ],
      value: 'patient-claim-table',
    },
    {
      document: `# Coming Soon`,
      label: 'Patine Imaging Study Table',
      parameters: [
        {
          defaultValue: '019fe101-2d2b-4346-89d6-7c7187c0ee3c',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      path: '/embedded-widget/patient-info/imaging-study-table/:patientId',
      queryParams: [
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
      ],
      value: 'patient-imaging-study-table',
    },
  ],
  label: 'Patient',
  value: 'patient',
}

export default patientEmbeddedWidgetConfig
