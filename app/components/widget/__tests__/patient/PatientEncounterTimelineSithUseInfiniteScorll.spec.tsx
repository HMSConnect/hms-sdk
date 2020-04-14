import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { routesMock } from '@routes/__mocks__/routesMock'
import EncounterServiceMock from '@services/__mocks__/EncounterServiceMock'
import EncounterService from '@services/EncounterService'
import { HMSService } from '@services/HMSServiceFactory'
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import routes from '../../../../routes'
import PatientEncounterTimeline from '../../patient/PatientEncounterTimeline'

jest.mock('../../../../routes', () => ({
  __esModule: true,
  default: routesMock,
}))

describe('<PatientEncounterTimeline With useInfinitescroll>', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })
    // const usePatientListResult: any = useInfinitScroll as any
    // const results: any = {
    //   data: [],
    //   setIsFetch: jest.fn(),
    //   totalCount: 20,
    // }
    // for (let i = 0; i < 20; i++) {
    //   results.data.push({
    //     organization: {
    //       display: `ServiceTest${i + 3}`,
    //     },
    //     reason: `Reason${i + 3}`,
    //     subject: '0001',
    //     type: `Ty00${i + 3}`,
    //   })
    // }
    // usePatientListResult.mockImplementation(() => results)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientEncounterTimeline With useInfinitescroll', async () => {
    const listSpyon = jest.fn()
    const results: any = {
      data: [],
      setIsFetch: jest.fn(),
      totalCount: 20,
    }
    for (let i = 0; i < 20; i++) {
      results.data.push({
        organization: {
          display: `ServiceTest${i + 3}`,
        },
        reason: `Reason${i + 3}`,
        subject: '0001',
        type: `Ty00${i + 3}`,
      })
    }
    jest.spyOn(EncounterServiceMock, 'list').mockImplementation((params) => {
      console.log('params :', params)
      listSpyon.call(params)
      return Promise.resolve(results)
    })
    const { queryByText } = render(
      <PatientEncounterTimeline patientId={'0001'} isContainer={false} />,
    )
    // expect(queryByText('ServiceTest3')).toBeTruthy()
    await act(async () => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } })
      // await waitForNextUpdate()
    })

    await act(async () => {
      fireEvent.scroll(window, { target: { pageYOffset: 1000 } })
    })

    expect(queryByText('ServiceTest3')).toBeTruthy()
    // expect(listSpyon).toHaveBeenCalledTimes(1)
    // console.log('listSpyon.mock.calls :', listSpyon.mock.calls)
    // expect(listSpyon.mock.calls[0][0].filter).toStrictEqual({
    //   patientId: '0001',
    //   periodStart_lt: undefined,
    //   status: '',
    //   type: undefined,
    // })
  })
})
