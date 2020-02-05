import * as React from 'react'

import EncounterServiceMock from '@components/hooks/__mocks__/EncounterServiceMock'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { routesMock } from '@routes/__mocks__/routesMock'
import EncounterService from '@services/EncounterService'
import { HMSService } from '@services/HMSServiceFactory'
import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import routes from '../../../routes'
import PatientEncounterTimeline from '../patient/PatientEncounterTimeline'

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('../../../routes', () => ({
  __esModule: true,
  default: routesMock,
}))

describe('PatientEncounterTimeline', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })
    const usePatientListResult: any = useInfinitScroll as any
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
    usePatientListResult.mockImplementation(() => results)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientEncounterTimeline', () => {
    const { queryByText } = render(
      <PatientEncounterTimeline patientId={'0001'} />,
    )
    expect(queryByText('ServiceTest3')).toBeTruthy()
  })

  it('select PatientEncounterTimeline', async () => {
    const { queryByText, getByText, getByTestId } = render(
      <PatientEncounterTimeline patientId={'0001'} />,
    )

    const encounterTimelineElement = getByText('ServiceTest3')
    fireEvent.click(encounterTimelineElement)

    await waitForDomChange()

    fireEvent.click(getByText('Reason3'))
    const replaceRouteFn = routes.Router.replaceRoute

    expect(replaceRouteFn).toBeCalled()
  })

  //   it('fetch more PatientEncounterTimeline', async () => {
  //     const { queryByText, getByText, getByTestId } = render(
  //       <PatientEncounterTimeline patientId={'0001'} />,
  //     )
  //     const scrollContainerElement = getByTestId('scroll-container')

  //     const test = window.getComputedStyle(scrollContainerElement as HTMLElement)

  //     // expect(queryByText('ServiceTest3')).toBeTruthy()

  //     // fireEvent.click(getByText('ServiceTest14'))
  //     console.log('scrollContainerElement :', scrollContainerElement)
  //     console.log('scrollTop :', scrollContainerElement.scrollTop)
  //     console.log('clientHeight :', scrollContainerElement.clientHeight)
  //     console.log('scrollHeight :', scrollContainerElement.scrollHeight)
  //     scrollContainerElement.scrollTop = 2000
  //     await waitForDomChange()
  //     expect(queryByText('ServiceTest1')).toBeTruthy()
  //   })

  // it('manual fetch PatientEncounterTimeline', () => {
  //   const { queryByText } = render(
  //     <PatientEncounterTimeline patientId={'0001'} isInitialize={true} />,
  //   )
  //   expect(queryByText('Test1')).toBeTruthy()

  //   const usePatientListResult: any = useInfinitScroll as any
  //   console.log(
  //     'usePatientListResult :',
  //     usePatientListResult.getMockImplementation(),
  //   )
  // })
})
