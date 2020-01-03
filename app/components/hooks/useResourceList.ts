import { useEffect, useState } from 'react'

import { HMSService } from '@services/HMSServiceFactory'
import PatientService from '@services/PatientService'
import * as _ from 'lodash'
import { IQueryResult } from './usePatientList'

const useResourceList = (id: string): any => {
  const [result, setResult] = useState<IQueryResult>({
    data: [],
    error: null,
  })
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const patientService = HMSService.getService(
          'patient',
        ) as PatientService
        const entryList = await patientService.resourceList(id)
        const resultsList = _.filter(
          entryList.data,
          entry => !_.isEmpty(entry.data),
        )

        setResult({
          ...entryList,
          data: [
            { resourceType: 'patient', totalCount: 1, data: [] },
            ...resultsList,
          ],
        })
      } catch (error) {
        setResult((prevResult: IQueryResult) => ({
          ...prevResult,
          error: error.message ? error.message : error,
        }))
      } finally {
        setLoading(false)
      }
    })()
  }, [id])
  return { isLoading, ...result }
}

export default useResourceList
