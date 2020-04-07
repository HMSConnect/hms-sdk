import * as React from 'react'

import observationHistoryGraph from '@app/reducers-redux/observationHistoryGraph.reducer'
import patientSummaryCards from '@app/reducers-redux/patientSummaryCards.reducer'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import useObservationList from '@components/hooks/useObservationList'
import ObservationHistoryGraph, {
  ObservationHistoryGraphWithConnector,
} from '@components/widget/observation/ObservationHistoryGraph'
import { combineReducers, createStore } from 'redux'

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
      <ObservationHistoryGraph patientId={'1'} />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: {
            selectedCard: 'bloodPressure',
          },
        }),
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
      <ObservationHistoryGraph patientId={'1'} />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: {
            selectedCard: 'bodyHeight',
          },
        }),
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
      <ObservationHistoryGraph patientId={'1'} />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: {
            selectedCard: 'bodyWeight',
          },
        }),
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
      <ObservationHistoryGraph patientId={'1'} />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: {
            selectedCard: 'bodyMassIndex',
          },
        }),
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
      <ObservationHistoryGraph patientId={'1'} />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: {
            selectedCard: 'bodyTemperature',
          },
        }),
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
      <ObservationHistoryGraph patientId={'1'} />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: {
            selectedCard: 'heartRate',
          },
        }),
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
      <ObservationHistoryGraph patientId={query.patientId} />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: {
            selectedCard: 'bloodPressure',
          },
        }),
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
      <ObservationHistoryGraph patientId={query.patientId} />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: {
            selectedCard: 'bloodPressure',
          },
        }),
      },
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
