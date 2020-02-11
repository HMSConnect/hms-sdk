import DiagnosticReportService from '@services/DiagnosticReportService'
import { HMSService } from '@services/HMSServiceFactory'
import { IServiceResult } from '@utils/types'
import usePromise from './utils/usePromise'

const useDiagnosticReport = (id: string): IServiceResult => {
  return usePromise(() => {
    const diagnosticReportService = HMSService.getService(
      'diagnostic_report',
    ) as DiagnosticReportService
    const test = diagnosticReportService.load(id)
    return test
  }, [id])
}

export default useDiagnosticReport
