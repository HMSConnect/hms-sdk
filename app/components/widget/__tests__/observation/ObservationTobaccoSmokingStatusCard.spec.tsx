import * as React from 'react'

import patientSummaryCards, {
  patientSummaryCardsInitialState,
} from '@app/reducers-redux/patientSummaryCards.reducer'
import useObservationList from '@components/hooks/useObservationList'
import ObservationTobaccoSmokingStatusCard, {
  ObservationTobaccoSmokingStatusCardWithConnector,
} from '@components/widget/observation/ObservationTobaccoSmokingStatusCard'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

function renderWithRedux(
  ui: any,
  {
    initialState = patientSummaryCardsInitialState,
    store = createStore(patientSummaryCards, {
      patientSummaryCards: initialState,
    }),
  }: any = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

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
    const { queryByText, queryAllByText } = renderWithRedux(
      <ObservationTobaccoSmokingStatusCardWithConnector />,
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
