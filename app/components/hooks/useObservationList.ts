import {
  IObservationListQuery,
  IObservationNeededParams,
} from '@data-managers/ObservationDataManager'
import { HMSService } from '@services/HMSServiceFactory'
import ObservationService from '@services/ObservationService'
import { IServiceResult } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'
import { validQueryParams } from '@utils'

const useObservationList = (
  options: IObservationListQuery,
  optionNeedParams?: IObservationNeededParams,
): IServiceResult => {
  return usePromise(() => {
    const validParams = validQueryParams(optionNeedParams, options)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const diagnosticReportService = HMSService.getService(
      'observation',
    ) as ObservationService
    return diagnosticReportService.list(options)
  }, _.values(options.filter))
}

export default useObservationList
