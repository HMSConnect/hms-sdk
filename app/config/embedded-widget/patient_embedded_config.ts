import { IWidgetGroup } from '@config'
import {
  carePlanStatusOption,
  claimStatusOption,
  conditionClinicalStatusOption,
  conditionVerificationStatusOption,
  encounterStatusOption,
  immunizationStatusOption,
  medicationRequestStatusOption,
  allergyIntoleranceTypeOption,
  allergyIntoleranceCriticalityOption,
} from '../patient'

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
      document: require('@assets/embedded-widget/patient-info/patient-info.md')
        .default,
      label: 'Patient Info Table',
      parameters: [
        // {
        //   defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
        //   label: 'Patient ID',
        //   type: 'text',
        //   value: 'patientId',
        // },
      ],
      path: '/embedded-widget/patient-info-with-table',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
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
      value: 'patient-info-table',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-summary.md')
        .default,
      label: 'Patient Summary',
      parameters: [],
      path: '/embedded-widget/patient-summary',
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

      value: 'patient-summary',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-demographic.md')
        .default,
      label: 'Patient Demographic',
      parameters: [],
      path: '/embedded-widget/patient-info/patient-demographic',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      structure: [
        {
          name: 'patientDemographic',
          structure: [
            {
              defaultValue: true,
              label: 'Address',
              type: 'boolean',
              value: 'addressField',
            },
            {
              defaultValue: true,
              label: 'Age',
              type: 'boolean',
              value: 'ageField',
            },
            {
              defaultValue: true,
              label: 'DOB',
              type: 'boolean',
              value: 'dobField',
            },
            {
              defaultValue: true,
              label: 'Email',
              type: 'boolean',
              value: 'emailField',
            },
            {
              defaultValue: true,
              label: 'Gender',
              type: 'boolean',
              value: 'genderField',
            },
            {
              defaultValue: true,
              label: 'Icon',
              type: 'boolean',
              value: 'iconField',
            },
            {
              defaultValue: true,
              label: 'Language',
              type: 'boolean',
              value: 'languageField',
            },
            {
              defaultValue: true,
              label: 'Name',
              type: 'boolean',
              value: 'nameField',
            },
            {
              defaultValue: true,
              label: 'Phone',
              type: 'boolean',
              value: 'phoneField',
            },
          ],
        },
      ],
      value: 'patient-demographic',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-encounter-timeline.md')
        .default,
      label: 'Patient Encounter Timeline',
      parameters: [],
      path: '/embedded-widget/patient-info/encounter-timeline',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
        {
          defaultValue: true,
          label: 'Routeable',
          type: 'boolean',
          value: 'isRouteable',
        },
        {
          choices: [{ label: 'None', value: '' }].concat(encounterStatusOption),
          defaultValue: '',
          label: 'InitialFilter[status]',
          type: 'options',
          value: 'initialFilter[status]',
        },
      ],
      structure: [
        {
          name: 'patientEncounterTimeline',
          structure: [
            {
              defaultValue: true,
              label: 'Header Icon',
              type: 'boolean',
              value: 'headerIconField',
            },
            {
              defaultValue: true,
              label: 'Filter Icon',
              type: 'boolean',
              value: 'filterIconField',
            },
            {
              defaultValue: true,
              label: 'Class Code',
              type: 'boolean',
              value: 'classCodeField',
            },
            {
              defaultValue: true,
              label: 'Diagnosis',
              type: 'boolean',
              value: 'diagnosisField',
            },
            {
              defaultValue: true,
              label: 'Pactitioner Code',
              type: 'boolean',
              value: 'practitionerField',
            },
            {
              defaultValue: true,
              label: 'TypeCureField',
              type: 'boolean',
              value: 'typeCureField',
            },
          ],
        },
      ],
      value: 'patient-encounter-timeline',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-allergy-intolerance-table.md')
        .default,
      label: 'Patient AllergyIntolerance Table',
      parameters: [],
      path: '/embedded-widget/patient-info/allergy-intolerance-table',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
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
      structure: [
        {
          name: 'patientAllergyIntoleranceTable',
          structure: [
            {
              defaultValue: true,
              label: 'Filter Icon',
              type: 'boolean',
              value: 'filterIconField',
            },
        
          ],
        },
      ],
      value: 'patient-allergy-intolerance-table',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-condition-table.md')
        .default,
      label: 'Patient Condition Table',
      parameters: [
        // {
        //   defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
        //   label: 'Patient ID',
        //   type: 'text',
        //   value: 'patientId',
        // },
      ],
      path: '/embedded-widget/patient-info/condition-table',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
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
      structure: [
        {
          name: 'patientConditionTable',
          structure: [
            {
              defaultValue: true,
              label: 'Header Icon',
              type: 'boolean',
              value: 'headerIconField',
            },
            {
              defaultValue: true,
              label: 'Filter Icon',
              type: 'boolean',
              value: 'filterIconField',
            },
          ],
        },
      ],
      value: 'patient-condition-table',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-immunization-table.md')
        .default,
      label: 'Patient Immunization Table',
      parameters: [
        // {
        //   defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
        //   label: 'Patient ID',
        //   type: 'text',
        //   value: 'patientId',
        // },
      ],
      path: '/embedded-widget/patient-info/immunization-table',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
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
      structure: [
        {
          name: 'patientImmunizationTable',
          structure: [
            {
              defaultValue: true,
              label: 'Header Icon',
              type: 'boolean',
              value: 'headerIconField',
            },
            {
              defaultValue: true,
              label: 'Filter Icon',
              type: 'boolean',
              value: 'filterIconField',
            },
            {
              defaultValue: true,
              label: 'Filter Group By Icon',
              type: 'boolean',
              value: 'filterGroupByField',
            },
          ],
        },
      ],
      value: 'patient-immunization-table',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-medication-request-table.md')
        .default,
      label: 'Patient Medication Request Table',
      parameters: [
        // {
        //   defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
        //   label: 'Patient ID',
        //   type: 'text',
        //   value: 'patientId',
        // },
      ],
      path: '/embedded-widget/patient-info/medication-request-table',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
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
      structure: [
        {
          name: 'patientMedicationRequestTable',
          structure: [
            {
              defaultValue: true,
              label: 'Filter Icon',
              type: 'boolean',
              value: 'filterIconField',
            },
          ],
        },
      ],
      value: 'patient-medication-request-table',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-procedure-table.md')
        .default,
      label: 'Patient Procedure Table',
      parameters: [
        // {
        //   defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
        //   label: 'Patient ID',
        //   type: 'text',
        //   value: 'patientId',
        // },
      ],
      path: '/embedded-widget/patient-info/procedure-table',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
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
      structure: [
        {
          name: 'patientProcedureTable',
          structure: [
            {
              defaultValue: true,
              label: 'Header Icon',
              type: 'boolean',
              value: 'headerIconField',
            },
            {
              defaultValue: true,
              label: 'Filter Icon',
              type: 'boolean',
              value: 'filterIconField',
            },
          ],
        },
      ],
      value: 'patient-procedure-table',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-care-plan-table.md')
        .default,
      label: 'Patient Care Plan Table',
      parameters: [],
      path: '/embedded-widget/patient-info/care-plan-table',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
        {
          choices: [{ label: 'None', value: '' }].concat(carePlanStatusOption),
          defaultValue: '',
          label: 'InitialFilter[status]',
          type: 'options',
          value: 'initialFilter[status]',
        },
      ],
      structure: [
        {
          name: 'patientCarePlanTable',
          structure: [
            {
              defaultValue: true,
              label: 'Filter Icon',
              type: 'boolean',
              value: 'filterIconField',
            },
            {
              defaultValue: true,
              label: 'Filter Group By Icon',
              type: 'boolean',
              value: 'filterGroupByField',
            },
          ],
        },
      ],
      value: 'patient-care-plan-table',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-claim-table.md')
        .default,
      label: 'Patient Claim Table',
      parameters: [
        // {
        //   defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
        //   label: 'Patient ID',
        //   type: 'text',
        //   value: 'patientId',
        // },
      ],
      path: '/embedded-widget/patient-info/claim-table',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
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
      structure: [
        {
          name: 'patientClaimTable',
          structure: [
            {
              defaultValue: true,
              label: 'Filter Icon',
              type: 'boolean',
              value: 'filterIconField',
            },
          ],
        },
      ],
      value: 'patient-claim-table',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-imaging-study-table.md')
        .default,
      label: 'Patient Imaging Study Table',
      parameters: [],
      path: '/embedded-widget/patient-info/imaging-study-table',
      queryParams: [
        {
          defaultValue: '03c2e1b5-9fe0-4735-bc7d-a54c449bfdae',
          label: 'Patient ID',
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
      value: 'patient-imaging-study-table',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-summary-cards.md')
        .default,
      label: 'Patient Summary Cards',
      parameters: [],
      path: '/embedded-widget/patient-info/summary-cards',
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
          defaultValue: true,
          label: 'Is Selectable',
          type: 'boolean',
          value: 'isSelectable',
        },
      ],
      value: 'patient-summary-cards',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-allergy-list-card.md')
        .default,
      label: 'Patient Allergy List Card',
      parameters: [],
      path: '/embedded-widget/patient-info/patient-allergy-list-card',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
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
      structure: [
        {
          name: 'patientAllergyList',
          structure: [
            {
              defaultValue: true,
              label: 'Header Icon',
              type: 'boolean',
              value: 'headerIconField',
            },
          ],
        },
      ],
      value: 'patient-allergy-list-card',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-medication-request-list-card.md')
        .default,
      label: 'Patient Medication Request List Card',
      parameters: [],
      path:
        '/embedded-widget/patient-info/patient-medication-request-list-card',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient ID',
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
      structure: [
        {
          name: 'patientMedicationList',
          structure: [
            {
              defaultValue: true,
              label: 'Header Icon',
              type: 'boolean',
              value: 'headerIconField',
            },
          ],
        },
      ],
      value: 'patient-medication-request-list-card',
    },
    {
      document: require('@assets/embedded-widget/patient-info/patient-practitioner-card.md')
        .default,
      label: 'Patient Practitioner Card',
      parameters: [],
      path: '/embedded-widget/patient-info/patient-practitioner-card',
      queryParams: [
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter ID',
          type: 'text',
          value: 'encounterId',
        },
        {
          defaultValue: 2,
          label: 'Max Display',
          type: 'number',
          value: 'maxDisplay',
        },
      ],
      value: 'patient-practitioner-card',
    },
  ],
  label: 'Patient',
  value: 'patient',
}

export default patientEmbeddedWidgetConfig
