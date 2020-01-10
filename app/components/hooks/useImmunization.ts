import { IImmunizationListQuery } from '@data-managers/ImmunizationDataManager'
import { HMSService } from '@services/HMSServiceFactory'
import ImmunizationService from '@services/ImmunizationService'
import { IServiceResult } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'

const useImmunization = (options: IImmunizationListQuery): IServiceResult => {
  return usePromise(() => {
    const immunizationService = HMSService.getService(
      'immunization',
    ) as ImmunizationService
    return immunizationService.list(options)
  }, _.values(options.filter))
}

export default useImmunization
