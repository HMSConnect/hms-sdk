import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import observationTobaccoSmokingStatusCard from '@app/reducers-redux/observation/observationTobaccoSmokingStatusCard.reducer'
import patientSummaryCards from '@app/reducers-redux/patient/patientSummaryCards.reducer'
import useObservationList from '@components/hooks/useObservationList'
import ObservationTobaccoSmokingStatusCard, {
  ObservationTobaccoSmokingStatusCardWithConnector,
} from '@components/widget/observation/ObservationTobaccoSmokingStatusCard'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { combineReducers, createStore } from 'redux'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))
describe('<ObservationTobaccoSmokingStatusCard />', () => {
  beforeAll(() => {
    const router = jest.spyOn(nextRouter, 'useRouter') as any
    router.mockImplementation(() => ({
      query: {
        encounterId: '0001',
        patientId: '0001',
      },
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('render ObservationTobaccoSmokingStatusCard', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8310-5',
          codeText: 'Temperature',
          id: '20',
          issued: '2019-01-01',
          unit: 'C',
          value: 31,
        },
      ],
      error: null,
      totalCount: 1,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText, queryAllByText } = render(
      <ObservationTobaccoSmokingStatusCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )

    expect(queryByText('31')).toBeTruthy()
    expect(queryAllByText('C')).toBeTruthy()
  })

  it('render ObservationTabacoSmokingStatusCardConnector with Redux', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8310-5',
          codeText: 'Temperature',
          id: '20',
          issued: '2019-01-01',
          unit: 'C',
          value: 31,
        },
      ],
      error: null,
      totalCount: 1,
    }
    useObservationListResult.mockImplementation(() => results)
    const rootReducer = combineReducers({
      observationTobaccoSmokingStatusCard,
      patientSummaryCards,
    })
    const { queryByText, queryAllByText } = renderWithRedux(
      <ObservationTobaccoSmokingStatusCardWithConnector />,
      {
        initialState: {},
        store: createStore(rootReducer, {
          observationTobaccoSmokingStatusCard: {},
          patientSummaryCards: { selectedCard: 'bloodPressure' },
        }),
      },
    )

    expect(queryByText('31')).toBeTruthy()
    expect(queryAllByText('C')).toBeTruthy()
  })

  it('loading ObservationTobaccoSmokingStatusCard', () => {
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
    const { queryByText, queryAllByText } = render(
      <ObservationTobaccoSmokingStatusCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })
  it('error ObservationTobaccoSmokingStatusCard', () => {
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
    const { queryByText } = render(
      <ObservationTobaccoSmokingStatusCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
