import React from 'react'

import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import { act } from 'react-test-renderer'
import EncounterService from '../../../../services/EncounterService'
import { HMSService } from '../../../../services/HMSServiceFactory'
import EncounterServiceMock from '../../../hooks/__mocks__/EncounterServiceMock'
import PatientEncounterTable from '../PatientEncounterTable'

describe('<PatientEncounterTable />', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })
  })
  it('render <PatientEncounterTable />', () => {
    const resourceList = [
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'ADMS'
      },
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'CCS60'
      }
    ]
    const patient = {
      identifier: {
        id: {
          value: '123'
        }
      }
    }
    const { findAllByText } = render(
      <PatientEncounterTable resourceList={resourceList} patient={patient} />
    )
    expect(findAllByText('ADMS')).toBeTruthy()
  })

  it('fire groupBy Type <PatientEncounterTable />', async () => {
    jest.spyOn(EncounterServiceMock, 'list').mockImplementation(() => {
      return Promise.resolve({
        data: [
          {
            reason: 'test3',
            type: 'HAM'
          },
          {
            reason: 'test4',
            type: 'HAM'
          }
        ],
        error: null
      })
    })
    const resourceList = [
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'ADMS'
      },
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'CCS60'
      }
    ]
    const patient = {
      identifier: {
        id: {
          value: '123'
        }
      }
    }

    const { getByTestId, container, findAllByText, getByText } = render(
      <PatientEncounterTable resourceList={resourceList} patient={patient} />
    )

    const checkboxElement = getByTestId(
      'check-by-type-input'
    ).getElementsByTagName('input')[0]
    expect(checkboxElement).toBeTruthy()

    expect(checkboxElement.checked).toBeFalsy()
    await act(async () => {
      fireEvent.click(checkboxElement)
      await waitForDomChange()
    })
    expect(checkboxElement.checked).toBeTruthy()

    await act(async () => {
      fireEvent.click(checkboxElement)
      await waitForDomChange()
    })

    expect(checkboxElement.checked).toBeFalsy()

    expect(findAllByText('test3')).toBeTruthy()
    expect(findAllByText('HAM')).toBeTruthy()
    expect(findAllByText('test4')).toBeTruthy()
  })

  it('fire loadMore Type <PatientEncounterTable />', async () => {
    jest.spyOn(EncounterServiceMock, 'list').mockImplementation(() => {
      return Promise.resolve({
        data: [
          {
            reason: 'test3',
            type: 'HAM'
          },
          {
            reason: 'test4',
            type: 'HAM'
          }
        ],
        error: null
      })
    })

    const resourceList = [
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'ADMS'
      },
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'CCS60'
      }
    ]
    const patient = {
      identifier: {
        id: {
          value: '123'
        }
      }
    }

    const { getByTestId, container, findAllByText, getByText } = render(
      <PatientEncounterTable resourceList={resourceList} patient={patient} />
    )

    // await waitForDomChange()

    const loadButton = getByText('Load More')
    expect(loadButton).toBeTruthy()

    await act(async () => {
      fireEvent.click(loadButton)
      await waitForDomChange()
    })

    expect(findAllByText('CCS60')).toBeTruthy()
    expect(findAllByText('ADMS')).toBeTruthy()
    expect(findAllByText('test1')).toBeTruthy()
    expect(findAllByText('test3')).toBeTruthy()
    expect(findAllByText('HAM')).toBeTruthy()
    expect(findAllByText('test4')).toBeTruthy()
  })
})
