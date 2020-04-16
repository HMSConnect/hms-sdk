import * as React from 'react'

import * as patientSummaryAction from '@app/actions/patientsummaryCards.action'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import observationHeartRateCard from '@app/reducers-redux/observationHeartRateCard.reducer'
import patientSummaryCards from '@app/reducers-redux/patientSummaryCards.reducer'
import useObservationList from '@components/hooks/useObservationList'
import { fireEvent, render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { combineReducers, createStore } from 'redux'
import ObservationHeartRateCard, {
  ObservationHeartRateCardWithConnector,
} from '../../observation/ObservationHeartRateCard'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))
describe('<ObservaionHeartRateCard />', () => {
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
  it('render ObservaionHeartRateCard', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8867-4',
          codeText: 'Heart Rate',
          id: '10',
          issued: '2019-01-01',
          unit: 'BPM',
          value: 130,
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
      <ObservationHeartRateCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )

    expect(queryByText('130')).toBeTruthy()
    expect(queryAllByText('BPM')).toBeTruthy()
  })

  it('render ObservaionHeartRateCardWithConnector with Redux', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8867-4',
          codeText: 'Heart Rate',
          id: '10',
          issued: '2019-01-01',
          unit: 'BPM',
          value: 130,
        },
      ],
      error: null,
      totalCount: 1,
    }
    useObservationListResult.mockImplementation(() => results)
    const rootReducer = combineReducers({
      observationHeartRateCard,
      patientSummaryCards,
    })
    const { queryByText, queryAllByText } = renderWithRedux(
      <ObservationHeartRateCardWithConnector />,
      {
        initialState: {},
        store: createStore(rootReducer, {
          observationHeartRateCard: {},
          patientSummaryCards: { selectedCard: 'bloodPressure' },
        }),
      },
    )

    expect(queryByText('130')).toBeTruthy()
    expect(queryAllByText('BPM')).toBeTruthy()
  })

  it('click ObservaionHeartRateCardWithConnector with Redux', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8867-4',
          codeText: 'Heart Rate',
          id: '10',
          issued: '2019-01-01',
          unit: 'BPM',
          value: 130,
        },
      ],
      error: null,
      totalCount: 1,
    }
    useObservationListResult.mockImplementation(() => results)
    const cardClickFunction = jest
      .spyOn(patientSummaryAction, 'cardClick')
      .mockImplementation((res) => {
        return { type: 'test', payload: { name: 'gg' } }
      })
    const rootReducer = combineReducers({
      observationHeartRateCard,
      patientSummaryCards,
    })
    const { queryByText, queryAllByText, getByText } = renderWithRedux(
      <ObservationHeartRateCardWithConnector />,
      {
        initialState: {},
        store: createStore(rootReducer, {
          observationHeartRateCard: {},
          patientSummaryCards: { selectedCard: 'bloodPressure' },
        }),
      },
    )

    expect(queryByText('130')).toBeTruthy()
    expect(queryAllByText('BPM')).toBeTruthy()

    const textBloodPressure = getByText('130')
    fireEvent.click(textBloodPressure)
    expect(cardClickFunction).toBeCalled()
  })

  it('loading ObservaionHeartRateCard', () => {
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
      <ObservationHeartRateCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })
  it('error ObservaionHeartRateCard', () => {
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
      <ObservationHeartRateCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
