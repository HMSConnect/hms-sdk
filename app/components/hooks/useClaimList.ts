import { IClaimListQuery } from '@data-managers/ClaimDataManager'
import ClaimService from '@services/ClaimService'
import { HMSService } from '@services/HMSServiceFactory'
import { IServiceResult } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'

const useClaimList = (options: IClaimListQuery): IServiceResult => {
  return usePromise(() => {
    const claimService = HMSService.getService('claim') as ClaimService
    return claimService.list(options)
  }, _.values(options.filter))
}

export default useClaimList
