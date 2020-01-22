import { IObservationListQuery } from '@data-managers/ObservationDataManager'
import { HMSService } from '@services/HMSServiceFactory'
import { IServiceResult } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'
import EncounterService from '@services/EncounterService'
import { IEncounterListQuery } from '@data-managers/EncounterDataManager'

const useEncounterList = (options: IEncounterListQuery): IServiceResult => {
  return usePromise(() => {
    const encounterService = HMSService.getService(
      'encounter',
    ) as EncounterService
    return encounterService.list(options)
  }, _.values(options.filter))
}

export default useEncounterList
