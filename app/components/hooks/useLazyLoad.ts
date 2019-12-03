import { useEffect, useState } from 'react'

import * as _ from 'lodash'
import { IQueryResult } from './usePatientList'

export interface ILazyLoadOption {
  max: number
  filter?: any
}

const useLazyLoad = (
  defaultList: any[],
  fetchMoreAsync: () => Promise<any>
): any => {
  const [result, setResult] = useState<IQueryResult>({
    data: [],
    error: null
  })
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isMore, setIsMore] = useState<boolean>(true)

  const [isFetch, setIsFetch] = useState<boolean>(false)
  useEffect(() => {
    ;(async () => {
      if (isFetch) {
        try {
          setLoading(true)
          const entryData: any = await fetchMoreAsync()
          // TODO: handle fetchMoreAsync isn't promise
          if (!_.isEmpty(_.get(entryData, 'data'))) {
            setResult((prevData: any) => ({
              ...prevData,
              data: _.concat(prevData.data, _.get(entryData, 'data'))
            }))
          } else {
            setIsMore(false)
          }
        } catch (error) {
          setResult((prevResult: IQueryResult) => ({
            ...prevResult,
            error: error.message
          }))
        } finally {
          setLoading(false)
          setIsFetch(false)
        }
      }
    })()
  }, [isFetch])

  useEffect(() => {
    setResult((prevData: any) => ({
      ...prevData,
      data: defaultList
    }))
    setLoading(false)
  }, [defaultList])

  return { isLoading, ...result, setResult, isMore, setIsFetch, setIsMore }
}

export default useLazyLoad
