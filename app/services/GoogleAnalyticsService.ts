import environment from '@environment'
import ReactGA, { FieldsObject } from 'react-ga'

class GoogleAnalyticsFactory {
  initializeGoogleGA(options?: any) {
    if (process.env.NODE_ENV.trim() !== 'development') {
      console.debug('Initialize Google Analytics: ')
      ReactGA.initialize(environment.googleApi.ga, options)
    }
  }

  setReactGA(fieldsObject: FieldsObject, trackNames?: any) {
    if (process.env.NODE_ENV.trim() !== 'development') {
      ReactGA.set(fieldsObject)
    }
  }

  trackPage(page: string, options?: FieldsObject, trackNames?: any) {
    if (process.env.NODE_ENV.trim() !== 'development') {
      ReactGA.set({ page, ...options })
      ReactGA.pageview(page)
    }
  }
}

export const GoogleAnalytics = new GoogleAnalyticsFactory()
