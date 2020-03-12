import * as React from 'react'

import * as patientSummaryAction from '@app/actions/patientsummaryCards.action'
import patientSummaryCards, {
  patientSummaryCardsInitialState,
} from '@app/reducers-redux/patientSummaryCards.reducer'
import useObservationList from '@components/hooks/useObservationList'
import { fireEvent, render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import ObservationTabacoSmokingStatusCard, {
  ObservationTabacoSmokingStatusCardWithConnector,
} from '../../observation/ObservationTabacoSmokingStatusCard'

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
describe('<ObservationTabacoSmokingStatusCard />', () => {
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
  it('render ObservationTabacoSmokingStatusCard', () => {
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
      <ObservationTabacoSmokingStatusCard
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
      <ObservationTabacoSmokingStatusCardWithConnector />,
    )

    expect(queryByText('31')).toBeTruthy()
    expect(queryAllByText('C')).toBeTruthy()
  })

  it('loading ObservationTabacoSmokingStatusCard', () => {
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
      <ObservationTabacoSmokingStatusCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })
  it('error ObservationTabacoSmokingStatusCard', () => {
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
      <ObservationTabacoSmokingStatusCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
