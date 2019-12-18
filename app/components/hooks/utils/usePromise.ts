import { useEffect, useState } from 'react'

import { IQueryResult } from '../../../utils/types'

export interface IPromiseResult extends IQueryResult {
  isLoading: boolean
}

function resolvePromise(promise: any) {
  if (typeof promise === 'function') {
    return promise()
  }
  return promise
}

export default function usePromise(
  fnPromise: Promise<IQueryResult> | (() => Promise<IQueryResult>),
  inputs: any[] = []
): IPromiseResult {
  const [result, setResult] = useState<IQueryResult>({
    data: {},
    error: null
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (typeof fnPromise === 'function') {
      resolvePromise(fnPromise)
        .then((result: any) => {
          setResult({ ...result, data: result.data || {} })
        })
        .catch((err: any) => {
          setResult((prevResult: IQueryResult) => ({
            ...prevResult,
            error: err.message
          }))
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setResult((prevResult: IQueryResult) => ({
        ...prevResult,
        error: `usePromise can't resolve promise`
      }))
      setIsLoading(false)
    }
  }, inputs)

  return { isLoading, ...result }
}
