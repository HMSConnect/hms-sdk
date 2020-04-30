import useObservationList from '@components/hooks/useObservationList'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import * as React from 'react'
import ObservationBodyHeightGraph from '../../observation/ObservationBodyHeightGraph'

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

describe('<ObservationBodyHeightGraph />', () => {
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
  it('render ObservationBodyHeightGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2019-01-01',
          issuedDate: '2019-01-01',
          unit: 'C',
          value: 31,
        },
        {
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2018-12-01',
          issuedDate: '2018-12-01',
          unit: 'C',
          value: 33,
        },
      ],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText, getByText } = render(
      <ObservationBodyHeightGraph patientId={'1'} />,
    )
    expect(queryByText('31C')).toBeTruthy()
  })

  it('loading ObservationBodyHeightGraph', () => {
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
      <ObservationBodyHeightGraph patientId={query.patientId} />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })
  it('error ObservationBodyHeightGraph', () => {
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
      <ObservationBodyHeightGraph patientId={query.patientId} />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
