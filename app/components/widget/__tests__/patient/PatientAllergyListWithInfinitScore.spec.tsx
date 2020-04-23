import * as React from 'react'

import { routesMock } from '@routes/__mocks__/routesMock'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { HMSService } from '@services/HMSServiceFactory'
import AllergyIntoleranceServiceMock from '@services/__mocks__/AllergyIntoleranceServiceMock'
import { act, fireEvent, render } from '@testing-library/react'
import PatientAllergyList from '../../patient/PatientAllergyList'

jest.mock('../../../../routes', () => ({
  __esModule: true,
  default: routesMock,
}))

describe('<PatientAllergyList With useInfinitescroll>', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return AllergyIntoleranceServiceMock as AllergyIntoleranceService
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientAllergyList With useInfinitescroll', async () => {
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
        codeText: `Allergy to bee venom ${i + 3}`,
        criticality: 'low',
        id: `${i + 1}`,
      })
    }
    jest
      .spyOn(AllergyIntoleranceServiceMock, 'list')
      .mockImplementation((params) => {
        listSpyon.call(params)
        return Promise.resolve(results)
      })
    const { queryByText } = render(
      <PatientAllergyList
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

    expect(queryByText('Allergy to bee venom 4')).toBeTruthy()
  })
})
