import { IConditionListQuery } from '@data-managers/ConditionDataManager'
import ConditionService from '@services/ConditionService'
import { HMSService } from '@services/HMSServiceFactory'
import { IServiceResult } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'

const useConditionList = (options: IConditionListQuery): IServiceResult => {
  return usePromise(() => {
    const conditionService = HMSService.getService(
      'condition',
    ) as ConditionService
    return conditionService.list(options)
  }, _.values(options.filter))
}

export default useConditionList
