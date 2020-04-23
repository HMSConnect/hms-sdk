import * as React from 'react'

import { routesMock } from '@routes/__mocks__/routesMock'
import { HMSService } from '@services/HMSServiceFactory'
import { act, fireEvent, render } from '@testing-library/react'
import PatientImagingStudyTable from '../../patient/PatientImagingStudyTable'
import ImagingStudyServiceMock from '@services/__mocks__/ImagingStudyServiceMock'
import ImagingStudyService from '@services/ImagingStudyService'

jest.mock('../../../../routes', () => ({
  __esModule: true,
  default: routesMock,
}))

describe('<PatientImagingStudyTable With useInfinitescroll>', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return ImagingStudyServiceMock as ImagingStudyService
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientImagingStudyTable With useInfinitescroll', async () => {
    const listSpyon = jest.fn()
    const results: any = {
      data: [],
      setIsFetch: jest.fn(),
      totalCount: 20,
    }
    for (let i = 0; i < 20; i++) {
      const date = `${i}`.padStart(2, '0')
      results.data.push({
        id: `${i + 1}`,
        series: [
          {
            instance: [
              {
                title: `Image of ankle ${i + 3}`,
              },
            ],
          },
        ],
        startedText: `2019-01-${date}`,
      })
    }
    jest.spyOn(ImagingStudyServiceMock, 'list').mockImplementation((params) => {
      listSpyon.call(params)
      return Promise.resolve(results)
    })
    const { queryByText } = render(
      <PatientImagingStudyTable
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

    expect(queryByText('Image of ankle 4')).toBeTruthy()
  })
})
