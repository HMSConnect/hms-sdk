import environment from '@environment'
import * as _ from 'lodash'
import qs from 'qs'

interface IPostMessage {
  action?: string
  message?: string
  path?: string
  params?: any
  result?: any
  error?: any
}

export function toNaturalName(s: string) {
  return _.chain(s)
    .words()
    .map(v => _.capitalize(v))
    .join(' ')
    .value()
}

export function parse(s: string) {
  const decoded = qs.parse(s)
  // qs -> option decode not work, use JSON.parse instead.

  return JSON.parse(JSON.stringify(decoded), (key: any, value: any) => {
    if (/^(\d+|\d*\.\d+)$/.test(value)) {
      return Number(value)
    }
    const keywords: any = {
      false: false,
      null: null,
      true: true,
    }
    if (value in keywords) {
      return keywords[value]
    }

    return value
  })
}

export const sendMessage = (message: IPostMessage) => {
  if (typeof window !== undefined) {
    window.parent.postMessage(
      {
        ...message,
        eventType: 'embedded-widget',
      },
      environment.iframe.targetOrigin,
    )
  }
}
