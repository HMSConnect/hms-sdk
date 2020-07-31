import { useEffect, useState } from 'react'

import EncounterService from '@services/EncounterService'
import { HMSService } from '@services/HMSServiceFactory'
import { IQueryResult, IServiceResult } from '@utils/types'
import usePromise from './utils/usePromise'

const useEncounter = (id: string,options:any={}): IServiceResult => {
  return usePromise(() => {
    const EncounterService = HMSService.getService(
      'encounter',
    ) as EncounterService
    return EncounterService.load(id,options)
  }, [id])
}

export default useEncounter
