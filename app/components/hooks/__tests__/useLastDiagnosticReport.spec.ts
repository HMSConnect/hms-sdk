import { renderHook } from '@testing-library/react-hooks'
import DiagnosticReportService from '../../../services/DiagnosticReportService'
import { HMSService } from '../../../services/HMSServiceFactory'
import useLastDiagnosticReport from '../useLastDiagnosticReport'
import DiagnosticReportServiceMock from '../__mocks__/DiagnosticReportServiceMock'

describe('useLastDiagnosticReport', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return DiagnosticReportServiceMock as DiagnosticReportService
    })
  })

  it('initial useLastDiagnosticReport', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLastDiagnosticReport({})
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual({
      codeText: 'Code Text1',
      issued: '2019-01-01'
    })
  })

  it('handler error useLastDiagnosticReport', async () => {
    jest.spyOn(DiagnosticReportServiceMock, 'last').mockImplementation(() => {
      return Promise.reject(new Error('error!!'))
    })

    const { result, waitForNextUpdate } = renderHook(() =>
      useLastDiagnosticReport({})
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!')
  })
})
