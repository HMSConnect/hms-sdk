import { IDiagnosticReportLastQuery } from '@data-managers/DiagnosticReportDataManager'
import { IObservationNeededParams } from '@data-managers/ObservationDataManager'
import DiagnosticReportService from '@services/DiagnosticReportService'
import { HMSService } from '@services/HMSServiceFactory'
import { validQueryParams } from '@utils'
import { IServiceResult } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'

const useDiagnosticReportList = (
  options: IDiagnosticReportLastQuery,
  optionNeedParams?: IObservationNeededParams,
): IServiceResult => {
  return usePromise(() => {
    const validParams = validQueryParams(optionNeedParams, options)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const diagnosticReportService = HMSService.getService(
      'diagnostic_report',
    ) as DiagnosticReportService
    return diagnosticReportService.list(options)
  }, _.values(options.filter))
}

export default useDiagnosticReportList
