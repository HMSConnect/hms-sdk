import { IObservationListQuery } from '@data-managers/ObservationDataManager'
import { HMSService } from '@services/HMSServiceFactory'
import ObservationService from '@services/ObservationService'
import { IServiceResult } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'

const useObservationList = (options: IObservationListQuery): IServiceResult => {
  return usePromise(() => {
    const diagnosticReportService = HMSService.getService(
      'observation',
    ) as ObservationService
    return diagnosticReportService.list(options)
  }, _.values(options.filter))
}

export default useObservationList
