import useObservationList from '@components/hooks/useObservationList'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import * as React from 'react'
import ObservationBodyMeasurementCard from '../observation/ObservationBodyMeasurementCard'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))
describe('<ObservaionBloodPressureCard />', () => {
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
  it('render ObservaionBloodPressureCard', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2019-01-01',
          unit: 'm',
          value: 168,
        },
        {
          code: '29463-7',
          codeText: 'Body Weight',
          id: '3',
          issued: '2019-01-01',
          unit: 'kg',
          value: 59,
        },
        {
          code: '39156-5',
          codeText: 'Body Mass Index',
          id: '4',
          issued: '2019-01-01',
          unit: 'kg/m2',
          value: 24.133,
        },
      ],
      error: null,
      totalCount: 4,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText, queryAllByText } = render(
      <ObservationBodyMeasurementCard patientId={query.patientId} />,
    )

    expect(queryByText('168.00')).toBeTruthy()
    expect(queryByText('59.00')).toBeTruthy()
    expect(queryByText('24.13')).toBeTruthy()
    expect(queryAllByText('kg')).toBeTruthy()
  })

  it('loading ObservaionBloodPressureCard', () => {
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
      <ObservationBodyMeasurementCard patientId={query.patientId} />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })
  it('error ObservaionBloodPressureCard', () => {
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
      <ObservationBodyMeasurementCard patientId={query.patientId} />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
