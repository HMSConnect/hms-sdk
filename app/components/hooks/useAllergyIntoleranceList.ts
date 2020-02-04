import { IAllergyIntoleranceListQuery } from '@data-managers/AllergyIntoleranceDataManager'
import { IObservationNeededParams } from '@data-managers/ObservationDataManager'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { HMSService } from '@services/HMSServiceFactory'
import { validQueryParams } from '@utils'
import { IServiceResult } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'

const useAllergyIntoleranceList = (
  options: IAllergyIntoleranceListQuery,
  optionNeedParams?: string[],
): IServiceResult => {
  return usePromise(() => {
    const validParams = validQueryParams(optionNeedParams, options.filter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const alleryIntoleranceService = HMSService.getService(
      'allergy_intolerance',
    ) as AllergyIntoleranceService
    return alleryIntoleranceService.list(options)
  }, _.values(options.filter))
}

export default useAllergyIntoleranceList
