import * as React from 'react'

import { routesMock } from '@routes/__mocks__/routesMock'
import { HMSService } from '@services/HMSServiceFactory'
import MedicationRequestService from '@services/MedicationRequestService'
import MedicationRequestServiceMock from '@services/__mocks__/MedicationRequestServiceMock'
import { act, fireEvent, render } from '@testing-library/react'
import PatientMedication from '../../patient/PatientMedication'

jest.mock('../../../../routes', () => ({
  __esModule: true,
  default: routesMock,
}))

describe('<PatientMedication With useInfinitescroll>', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return MedicationRequestServiceMock as MedicationRequestService
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientMedication With useInfinitescroll', async () => {
    const listSpyon = jest.fn()
    const results: any = {
      data: [],
      setIsFetch: jest.fn(),
      totalCount: 20,
    }
    for (let i = 0; i < 20; i++) {
      const date = `${i}`.padStart(2, '0')
      results.data.push({
        assertedDateText: `2019-01-${date}`,
        id: `${i + 1}`,
        medicationCodeableConcept: `Levora 0.15/30 ${i + 3}`,
      })
    }
    jest
      .spyOn(MedicationRequestServiceMock, 'list')
      .mockImplementation((params) => {
        listSpyon.call(params)
        return Promise.resolve(results)
      })
    const { queryByText } = render(
      <PatientMedication
        patientId={'0001'}
        isContainer={false}
        isInitialize={false}
      />,
    )
    await act(async () => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } })
    })

    await act(async () => {
      fireEvent.scroll(window, { target: { pageYOffset: 1000 } })
    })

    expect(queryByText('Levora 0.15/30 4')).toBeTruthy()
  })
})
