import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import useObservationList from '@components/hooks/useObservationList'
import ObservationHistoryGraph, {
  ObservationHistoryGraphWithConnector,
} from '@components/widget/observation/ObservationHistoryGraph'
import { combineReducers, createStore } from 'redux'
import patientSummaryCards from '@app/reducers-redux/patient/patientSummaryCards.reducer'
import observationHistoryGraph from '@app/reducers-redux/observation/observationHistoryGraph.reducer'
import { render } from '@testing-library/react'
import observationBloodPressureCard from '@app/reducers-redux/observation/observationBloodPressureCard.reducer'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

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

describe('<ObservationHistoryGraph>', () => {
  it('render Blood Pressure ObservationHistoryGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = renderWithRedux(
      <ObservationHistoryGraph patientId={'1'} selectedCard='bloodPressure' />,
      {
        initialState: {},
        store: createStore(
          combineReducers({
            observationBloodPressureGraph: (
              state = { structure: {} },
              action,
            ) => {
              return state
            },
            patientSummaryCards,
          }),
          {
            observationBloodPressureGraph: {
              structure: {},
            },
            patientSummaryCards: {
              selectedCard: 'bloodPressure',
            },
          },
        ),
      },
    )
    expect(queryByText('Blood Pressure')).toBeTruthy()
  })

  it('render Blood Pressure ObservationHistoryGraphWithConnector', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = renderWithRedux(
      <ObservationHistoryGraphWithConnector />,
      {
        initialState: {},
        store: createStore(
          combineReducers({
            observationHistoryGraph,
            patientSummaryCards,
          }),
          {
            observationHistoryGraph: {
              patientId: '1',
            },
            patientSummaryCards: {
              selectedCard: 'bloodPressure',
            },
          },
        ),
      },
    )
    expect(queryByText('Blood Pressure')).toBeTruthy()
  })

  it('render Body Height ObservationHistoryGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = renderWithRedux(
      <ObservationHistoryGraph patientId={'1'} selectedCard='bodyHeight' />,
      {
        initialState: {},
        store: createStore(
          combineReducers({
            observationBodyHeightGraph: (state = { structure: {} }, action) =>
              state,
            patientSummaryCards,
          }),
          {
            observationBodyHeightGraph: {
              structure: {},
            },
            patientSummaryCards: {
              selectedCard: 'bodyHeight',
            },
          },
        ),
      },
    )
    expect(queryByText('Body Height')).toBeTruthy()
  })

  it('render Body Weight ObservationHistoryGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = renderWithRedux(
      <ObservationHistoryGraph patientId={'1'} selectedCard='bodyWeight' />,
      {
        initialState: {},
        store: createStore(
          combineReducers({
            observationBodyWeightGraph: (state = { structure: {} }, action) =>
              state,
            patientSummaryCards,
          }),
          {
            observationBodyWeightGraph: {
              structure: {},
            },
            patientSummaryCards: {
              selectedCard: 'bodyWeight',
            },
          },
        ),
      },
    )
    expect(queryByText('Body Weight')).toBeTruthy()
  })

  it('render Body Mass Index ObservationHistoryGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = renderWithRedux(
      <ObservationHistoryGraph patientId={'1'} selectedCard='bodyMassIndex' />,
      {
        initialState: {},
        store: createStore(
          combineReducers({
            observationBodyMassIndexGraph: (
              state = { structure: {} },
              action,
            ) => state,
            patientSummaryCards,
          }),
          {
            observationBodyMassIndexGraph: {
              structure: {},
            },
            patientSummaryCards: {
              selectedCard: 'bodyMassIndex',
            },
          },
        ),
      },
    )
    expect(queryByText('Body Mass Index')).toBeTruthy()
  })

  it('render Body Temperature ObservationHistoryGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = renderWithRedux(
      <ObservationHistoryGraph
        patientId={'1'}
        selectedCard='bodyTemperature'
      />,
      {
        initialState: {},
        store: createStore(
          combineReducers({
            observationBodyTemperatureGraph: (
              state = { structure: {} },
              action,
            ) => state,
            patientSummaryCards,
          }),
          {
            observationBodyTemperatureGraph: {
              structure: {},
            },
            patientSummaryCards: {
              selectedCard: 'bodyTemperature',
            },
          },
        ),
      },
    )
    expect(queryByText('Body Temperature')).toBeTruthy()
  })

  it('render Heart Rate ObservationHistoryGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = renderWithRedux(
      <ObservationHistoryGraph patientId={'1'} selectedCard='heartRate' />,
      {
        initialState: {},
        store: createStore(
          combineReducers({
            observationHeartRateGraph: (state = { structure: {} }, action) =>
              state,
            patientSummaryCards,
          }),
          {
            observationHeartRateGraph: {
              structure: {},
            },
            patientSummaryCards: {
              selectedCard: 'heartRate',
            },
          },
        ),
      },
    )
    expect(queryByText('Heart Rate')).toBeTruthy()
  })

  it('loading ObservationHistoryGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      isLoading: true,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText } = renderWithRedux(
      <ObservationHistoryGraph
        patientId={query.patientId}
        selectedCard='bloodPressure'
      />,
      {
        initialState: {},
        store: createStore(
          combineReducers({
            observationBloodPressureGraph: (
              state = { structure: {} },
              action,
            ) => state,
            patientSummaryCards,
          }),
          {
            observationBloodPressureGraph: {
              structure: {},
            },
            patientSummaryCards: {
              selectedCard: 'bloodPressure',
            },
          },
        ),
      },
    )
    expect(queryByText('loading..')).toBeTruthy()
  })

  it('error ObservationHistoryGraph', () => {
    const errorText = 'Error'
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: errorText,
      isLoading: true,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText } = renderWithRedux(
      <ObservationHistoryGraph
        patientId={query.patientId}
        selectedCard='bloodPressure'
      />,
      {
        initialState: {},
        store: createStore(
          combineReducers({
            observationBloodPressureGraph: (
              state = { structure: {} },
              action,
            ) => state,
            patientSummaryCards,
          }),
          {
            observationBloodPressureGraph: {
              structure: {},
            },
            patientSummaryCards: {
              selectedCard: 'bloodPressure',
            },
          },
        ),
      },
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
