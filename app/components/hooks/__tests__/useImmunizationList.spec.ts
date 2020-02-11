import ImmunizationService from '@services/ImmunizationService'
import { renderHook } from '@testing-library/react-hooks'
import { HMSService } from '../../../services/HMSServiceFactory'
import ImmunizationServiceMock from '../__mocks__/ImmunizationServiceMock'
import useImmunizationList from '../useImmunizationList'

describe('useImmunizationList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return ImmunizationServiceMock as ImmunizationService
    })
  })

  it('initial useImmunizationList', async () => {
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useImmunizationList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual([
      {
        clinicalStatus: 'completed',
        dateText: '2019-01-01',
        id: '1',
        vaccineCode: 'Influenza, seasonal, injectable, preservative free',
      },
      {
        clinicalStatus: 'not-done',
        dateText: '2019-01-02',
        id: '2',
        vaccineCode: 'Td (adult) preservative free',
      },
    ])
    expect(result.current.totalCount).toStrictEqual(2)
  })

  it('error useImmunizationList', async () => {
    jest.spyOn(ImmunizationServiceMock, 'list').mockImplementation(() => {
      return Promise.reject(Error('error!!!'))
    })
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useImmunizationList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!!')
  })
})
