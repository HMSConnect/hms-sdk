import * as React from 'react'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import PatientSummary from '@components/widget/patient/PatientSummary'
import { combineReducers, createStore } from 'redux'
import AllergyIntoleranceServiceMock from '@services/__mocks__/AllergyIntoleranceServiceMock'
import ObservationServiceMock from '@services/__mocks__/ObservationServiceMock'
import PatientServiceMock from '@services/__mocks__/PatientServiceMock'
import EncounterServiceMock from '@services/__mocks__/EncounterServiceMock'
import ProcedureServiceMock from '@services/__mocks__/ProcedureServiceMock'
import CarePlanServiceMock from '@services/__mocks__/CarePlanServiceMock'
import ConditionServiceMock from '@services/__mocks__/ConditionServiceMock'
import ImmunizationServiceMock from '@services/__mocks__/ImmunizationServiceMock'
import MedicationRequestServiceMock from '@services/__mocks__/MedicationRequestServiceMock'
import { HMSService } from '@services/HMSServiceFactory'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import PatientService from '@services/PatientService'
import EncounterService from '@services/EncounterService'
import ObservationService from '@services/ObservationService'
import ConditionService from '@services/ConditionService'
import ImmunizationService from '@services/ImmunizationService'
import ProcedureService from '@services/ProcedureService'
import MedicationRequestService from '@services/MedicationRequestService'

// jest.mock('@services/AllergyIntoleranceService', () => ({
//   __esModule: true,
//   default: AllergyIntoleranceServiceMock,
// }))

// jest.mock('@services/ObservationService', () => ({
//   __esModule: true,
//   default: ObservationServiceMock,
// }))

// jest.mock('@services/PatientService', () => ({
//   __esModule: true,
//   default: PatientServiceMock,
// }))

// jest.mock('@services/EncounterService', () => ({
//   __esModule: true,
//   default: EncounterServiceMock,
// }))

// jest.mock('@services/ProcedureService', () => ({
//   __esModule: true,
//   default: ProcedureServiceMock,
// }))

// jest.mock('@services/CarePlanService', () => ({
//   __esModule: true,
//   default: CarePlanServiceMock,
// }))

// jest.mock('@services/ConditionService', () => ({
//   __esModule: true,
//   default: ConditionServiceMock,
// }))

// jest.mock('@services/ImmunizationService', () => ({
//   __esModule: true,
//   default: ImmunizationServiceMock,
// }))

// jest.mock('@services/MedicationRequestService', () => ({
//   __esModule: true,
//   default: MedicationRequestServiceMock,
// }))

jest.mock('@devexpress/dx-react-chart-material-ui', () => {
  const RealModule = require.requireActual(
    '@devexpress/dx-react-chart-material-ui',
  )
  const MyModule = {
    ...RealModule,
    ArgumentAxis: () => <></>,
    ValueAxis: () => <></>,
  }
  return MyModule
})

describe('<PatientSummary />', () => {
  const rootReducer = combineReducers({
    observationBloodPressureCard: (state = {}, type) => {
      return state
    },
    observationBodyMeasurementCard: (state = {}, type) => {
      return state
    },
    observationHeartRateCard: (state = {}, type) => {
      return state
    },
    observationHistoryGraph: (state = {}, type) => {
      return state
    },
    observationLaboratoryTable: (state = {}, type) => {
      return state
    },
    observationSummaryGraph: (state = {}, type) => {
      return state
    },
    observationTemperatureCard: (state = {}, type) => {
      return state
    },
    observationTobaccoSmokingStatusCard: (state = {}, type) => {
      return state
    },
    patientAllergyList: (state = {}, type) => {
      return state
    },
    patientAllergySummaryCard: (state = {}, type) => {
      return state
    },
    patientCarePlanTable: (state = {}, type) => {
      return state
    },
    patientConditionTable: (state = {}, type) => {
      return state
    },
    patientDemographic: (state = {}, type) => {
      return state
    },
    patientEncounterTimeline: (state = {}, type) => {
      return state
    },
    patientImmunizationSummaryCard: (state = {}, type) => {
      return state
    },
    patientImmunizationTable: (state = {}, type) => {
      return state
    },
    patientMedicationList: (state = {}, type) => {
      return state
    },
    patientMedicationSummaryCard: (state = {}, type) => {
      return state
    },
    patientPractitioner: (state = {}, type) => {
      return state
    },
    patientProcedureTable: (state = {}, type) => {
      return state
    },
    patientSummaryCards: (state = {}, type) => {
      return state
    },
  })
  beforeAll(() => {
    jest
      .spyOn(HMSService, 'getService')
      .mockImplementation((params: string) => {
        switch (params) {
          case 'allergy_intolerance':
            return AllergyIntoleranceServiceMock as AllergyIntoleranceService
          case 'patient':
            return PatientServiceMock as PatientService
          case 'encounter':
            return EncounterServiceMock as EncounterService
          case 'observation':
            return ObservationServiceMock as ObservationService
          case 'condition':
            return ConditionServiceMock as ConditionService
          case 'immunization':
            return ImmunizationServiceMock as ImmunizationService
          case 'procedure':
            return ProcedureServiceMock as ProcedureService
          case 'medication_request':
            return MedicationRequestServiceMock as MedicationRequestService
          case 'immunization':
            return ImmunizationServiceMock as ImmunizationService
        }
      })
  })
  it('render PatientSummary', () => {
    const { queryAllByText } = renderWithRedux(
      <PatientSummary patientId={'1'} encounterId={'1'} />,
      {
        initialState: {},
        store: createStore(rootReducer),
      },
    )

    expect(queryAllByText('test2')).toBeTruthy()
  })
})
