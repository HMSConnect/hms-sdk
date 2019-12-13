import { renderHook } from '@testing-library/react-hooks'

import { HMSService } from '../../../services/HMSServiceFactory'
import PatientService from '../../../services/PatientService'
import PatientServiceMock from '../__mocks__/PatientServiceMock'
import usePatient from '../usePatient'

describe('UsePatient', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return PatientServiceMock as PatientService
    })
  })

  it('initial UsePatient', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePatient('1234'))
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual({
      birth: '2018/11/11',
      name: 'test'
    })
  })

  it('error UsePatient', async () => {
    jest.spyOn(PatientServiceMock, 'load').mockImplementation(() => {
      return Promise.reject(new Error('error Test'))
    })
    const { result, waitForNextUpdate } = renderHook(() => usePatient('1234'))
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error Test')
  })
})
