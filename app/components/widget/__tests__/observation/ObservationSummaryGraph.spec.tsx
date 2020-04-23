import * as React from 'react'

import useObservationList from '@components/hooks/useObservationList'
import usePatient from '@components/hooks/usePatient'
import ObservationSummaryGraph from '@components/widget/observation/ObservationSummaryGraph'
import {
  render,
  getByText,
  fireEvent,
  waitForDomChange,
} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { async } from 'rxjs/internal/scheduler/async'
import userEvent from '@testing-library/user-event'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/usePatient', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@config/observation', () => ({
  __esModule: true,
  OBSERVATION_CODE: {
    BLOOD_PRESSURE: { code: '55284-4', value: 'bloodPressure' },
    BODY_HEIGHT: { code: '8302-2', value: 'bodyHeight' },
    BODY_MASS_INDEX: { code: '39156-5', value: 'bodyMassIndex' },
    BODY_TEMPERATURE: { code: '8310-5', value: 'bodyTemperature' },
    BODY_WEIGHT: { code: '29463-7', value: 'bodyWeight' },
    HEART_RATE: { code: '8867-4', value: 'heartRate' },
    TABACO_SMOKING_STATUS: { code: '72166-2', value: 'tabacoSmokingStatue' },
  },
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

describe('<ObservationSummaryGraph />', () => {
  beforeAll(() => {
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: {
        age: 30,
        communication: ['English', 'Thai'],
        gender: 'male',
        name: {
          family: ['FTest1'],
          given: ['Test1'],
          prefix: ['Mr.'],
        },
        telecom: [
          {
            value: '091133',
          },
        ],
      },
      error: null,
      isLoading: false,
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  // it('render ObsevationSummaryGraph', () => {
  //   jest
  //     .spyOn(React, 'useReducer')
  //     .mockReturnValueOnce([
  //       {
  //         filter: {},
  //         submitedFilter: jest.fn(),
  //       },
  //       jest.fn(),
  //     ])
  //     .mockReturnValueOnce([
  //       {
  //         filter: {
  //           selection: { bloodPressure: true, bodyMassIndex: true },
  //         },
  //         submitedFilter: jest.fn(),
  //       },
  //       jest.fn(),
  //     ])

  //   const useObservationListResult: any = useObservationList as any
  //   const results: any = {
  //     data: [
  //       {
  //         code: '55284-4',
  //         codeText: 'Code Text1',
  //         id: '1',
  //         issued: '2019-01-01',
  //         issuedDate: '2019-01-01',
  //         unit: 'mmHg',
  //         value: '120/89',
  //         valueModal: [
  //           {
  //             code: 'Systolic Blood Pressure',
  //             unit: 'mmHg',
  //             value: 120,
  //           },
  //           {
  //             code: 'Diastolic Blood Pressure',
  //             unit: 'mmHg',
  //             value: 89,
  //           },
  //         ],
  //       },
  //       {
  //         code: '8302-2',
  //         codeText: 'Body Height',
  //         id: '2',
  //         issued: '2019-01-01',
  //         issuedDate: '2019-01-01',
  //         unit: 'kg/m2',
  //         value: 28.01,
  //       },
  //     ],
  //     error: null,
  //     totalCount: 2,
  //     setFilter: jest.fn(),
  //   }
  //   useObservationListResult.mockImplementation(() => results)

  //   const { queryByText, getByText } = render(
  //     <ObservationSummaryGraph
  //       patientId={'1'}
  //       selection={{ bloodPressure: true, bodyMassIndex: true }}
  //     />,
  //   )

  //   expect(queryByText('Summary Graph')).toBeTruthy()
  //   getByText('Diastolic Blood Pressure')
  //   expect(queryByText('Diastolic Blood Pressure')).toBeTruthy()
  // })

  it('add body weight graph ObsevationSummaryGraph', async () => {
    const setFilter = jest.fn()
    const dispatch = jest.fn()
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValueOnce([
        {
          filter: {},
          submitedFilter: {},
        },
        dispatch,
      ])
      .mockReturnValueOnce([
        {
          filter: {
            selection: { bloodPressure: true, bodyMassIndex: true },
          },
          submitedFilter: {},
        },
        dispatch,
      ])

    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '55284-4',
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
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2019-01-01',
          issuedDate: '2019-01-01',
          unit: 'kg/m2',
          value: 28.01,
        },
      ],
      error: null,
      totalCount: 2,
      setFilter,
    }
    useObservationListResult.mockImplementation(() => results)

    const { queryByText, getByTestId, getByText } = render(
      <ObservationSummaryGraph
        patientId={'1'}
        selection={{ bloodPressure: true, bodyMassIndex: true }}
      />,
    )

    expect(queryByText('Summary Graph')).toBeTruthy()
    expect(queryByText('Diastolic Blood Pressure')).toBeTruthy()

    const iconElement = getByTestId('toolbar-filter-icon')

    await act(async () => {
      userEvent.click(iconElement)
      await waitForDomChange()

      const bodyWeightCheckbox = getByText('Body Weight')
      userEvent.click(bodyWeightCheckbox)
      userEvent.click(getByTestId('modal-submit-button'))
    })

    expect(setFilter).toHaveBeenCalledTimes(2)
    expect(setFilter.mock.calls[1][0].selection).toStrictEqual({
      bloodPressure: true,
      bodyMassIndex: true,
      bodyWeight: true,
    })
  })
})
