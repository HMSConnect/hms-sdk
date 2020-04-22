import useObservationList from '@components/hooks/useObservationList'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import * as React from 'react'
import ObservationBloodPressureGraph from '../../observation/ObservationBloodPressureGraph'

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

describe('<ObservaionBloodPressureGraph />', () => {
  beforeAll(() => {
    const router = jest.spyOn(nextRouter, 'useRouter') as any
    router.mockImplementation(() => ({
      query: {
        encounterId: '0001',
        patientId: '0001',
      },
    }))
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('render ObservaionBloodPressureGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          codeText: 'Code Text1',
          id: '1',
          issued: '2019-01-01',
          issuedDate: '2019-01-01',
          unit: 'mmHg',
          value: '120/89',
          valueModal: [
            {
              code: 'Systolic Blood Pressure',
              unit: 'mmHg',
              value: 120,
            },
            {
              code: 'Diastolic Blood Pressure',
              unit: 'mmHg',
              value: 89,
            },
          ],
        },
        {
          codeText: 'Code Text1',
          id: '1',
          issued: '2018-12-01',
          issuedDate: '2018-12-01',
          unit: 'mmHg',
          value: '111/77',
          valueModal: [
            {
              code: 'Systolic Blood Pressure',
              unit: 'mmHg',
              value: 111,
            },
            {
              code: 'Diastolic Blood Pressure',
              unit: 'mmHg',
              value: 77,
            },
          ],
        },
      ],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText, queryAllByText, getByText } = render(
      <ObservationBloodPressureGraph patientId={'1'} />,
    )

    // expect(true).toBeTruthy()
    // getByText('mmHg')
    expect(queryByText('120/89mmHg')).toBeTruthy()
  })

  it('loading ObservaionBloodPressureGraph', () => {
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
      <ObservationBloodPressureGraph patientId={query.patientId} />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })

  it('error ObservaionBloodPressureGraph', () => {
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
      <ObservationBloodPressureGraph patientId={query.patientId} />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
