import * as _ from 'lodash'
import { IDiagnosticReportLastQuery } from '../../data-managers/DiagnosticReportDataManager'
import DiagnosticReportService from '../../services/DiagnosticReportService'
import { HMSService } from '../../services/HMSServiceFactory'
import { IServiceResult } from '../../utils/types'
import usePromise from './utils/usePromise'

const useDiagnosticReportList = (
  options: IDiagnosticReportLastQuery
): IServiceResult => {
  return usePromise(() => {
    const diagnosticReportService = HMSService.getService(
      'diagnostic_report'
    ) as DiagnosticReportService
    return diagnosticReportService.list(options)
  }, _.values(options.filter))
}

export default useDiagnosticReportList
