import {
  IObservationListQuery,
  IObservationNeededParams,
} from '@data-managers/ObservationDataManager'
import { HMSService } from '@services/HMSServiceFactory'
import ObservationService from '@services/ObservationService'
import { validQueryParams } from '@utils'
import { IServiceResult } from '@utils/types'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import values from 'lodash/values'
import usePromise from './utils/usePromise'

const useObservationList = (
  options: IObservationListQuery,
  optionNeedParams?: string[],
): IServiceResult => {
  return usePromise(() => {
    const validParams = validQueryParams(optionNeedParams, options.filter)
    if (!isEmpty(validParams)) {
      return Promise.reject(new Error(join(validParams, ', ')))
    }
    const diagnosticReportService = HMSService.getService(
      'observation',
    ) as ObservationService
    return diagnosticReportService.list(options)
  }, values(options.filter))
}

export default useObservationList
