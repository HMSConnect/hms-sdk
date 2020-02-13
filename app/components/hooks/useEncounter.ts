import { useEffect, useState } from 'react'

import EncounterService from '@services/EncounterService'
import { HMSService } from '@services/HMSServiceFactory'
import { IQueryResult, IServiceResult } from '@utils/types'

const useEncounter = (id: string): IServiceResult => {
  const [result, setResult] = useState<IQueryResult>({
    data: {},
    error: null,
  })
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const encounterService = HMSService.getService(
          'encounter',
        ) as EncounterService
        const result = await encounterService.load(id)
        setResult(result)
      } catch (error) {
        setResult((prevResult: IQueryResult) => ({
          ...prevResult,
          error: error.message,
        }))
      } finally {
        setLoading(false)
      }
    })()
  }, [id])
  return { isLoading, ...result }
}

export default useEncounter
