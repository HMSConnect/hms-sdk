import useObservationList from '@components/hooks/useObservationList'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import * as React from 'react'
import ObservationHeartRateGraph from '../../observation/ObservationHeartRateGraph'

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

describe('<ObservationHeartRateGraph />', () => {
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

  it('render ObservationHeartRateGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2019-01-01',
          issuedDate: '2019-01-01',
          unit: 'BPM',
          value: 90,
        },
        {
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2018-12-01',
          issuedDate: '2018-12-01',
          unit: 'BPM',
          value: 88,
        },
      ],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText, queryAllByText } = render(
      <ObservationHeartRateGraph patientId={'1'} />,
    )

    expect(queryByText('90BPM')).toBeTruthy()
  })

  it('loading ObservationHeartRateGraph', () => {
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
      <ObservationHeartRateGraph patientId={query.patientId} />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })

  it('error ObservationHeartRateGraph', () => {
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
      <ObservationHeartRateGraph patientId={query.patientId} />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
