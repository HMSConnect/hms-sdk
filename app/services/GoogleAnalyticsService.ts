import environment from '@environment'
import ReactGA, { FieldsObject } from 'react-ga'

interface IGAEvent {
  category: string
  action: string
  label?: string
}

class GoogleAnalyticsFactory {
  environment: any
  enable: boolean = false

  constructor(){
    this.environment = process.env.NODE_ENV.trim()
    this.enable = !['development', 'test'].includes(this.environment)
  }


  initializeGoogleGA(options?: any) {
    if (this.enable) {
      console.debug('Initialize Google Analytics: ')
      ReactGA.initialize(environment.googleApi.ga, options)
    }
  }

  setReactGA(fieldsObject: FieldsObject, trackNames?: any) {
    if (this.enable) {
      ReactGA.set(fieldsObject)
    }
  }

  trackPage(page: string, options?: FieldsObject, trackNames?: any) {
    if (this.enable) {
      ReactGA.set({ page, ...options })
      ReactGA.pageview(page)
    }
  }

  createEvent(eventObject: IGAEvent) {
    if (this.enable) {
      ReactGA.event(eventObject)
    }
  }
}

export const GoogleAnalytics = new GoogleAnalyticsFactory()
