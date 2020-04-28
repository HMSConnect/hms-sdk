import * as React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import * as _ from 'lodash'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { AdapterManager } from '../adapters/DataAdapterManager'
import LoadingSection from '../components/base/LoadingSection'
import ThemeLayoutWithConnect from '../components/templates/ThemeLayout'
import store from '../reducers-redux/index.reducer'
import RouteManager from '../routes/RouteManager'
import { GoogleAnalytics } from '../services/GoogleAnalyticsService'
import { MessageListenerService } from '../services/MessageListenerService'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

class AASApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  constructor(props) {
    super(props)
    let isWaitForIframeLoaded
    if (typeof window !== 'undefined') {
      AdapterManager.createAdapter(_.get(props, 'router.query.mode'))
      isWaitForIframeLoaded =
        _.get(props, 'router.query.isWaitForIframeLoaded') || false
      const pathName = props.router.pathname
      RouteManager.registryMode(pathName)
      this.initializeMessageService()
    }
    this.state = {
      isWaitForIframeLoaded,
      loading: true,
    }
  }
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    GoogleAnalytics.initializeGoogleGA()
  }

  initializeMessageService = () => {
    MessageListenerService.registerMessage('finishIframeLoading', () => {
      this.setState({
        ...this.state,
        loading: false,
      })
    })

    MessageListenerService.registerMessage('setStructure', (data) => {
      _.each(data, (value, key) => {
        const type = `SET_STRUCTURE_${_.toUpper(_.snakeCase(key))}`
        store.dispatch({ type, payload: value })
      })
    })

    MessageListenerService.registerMessage('setIframeName', (data) => {
      MessageListenerService.setIframeName(data)
    })

    MessageListenerService.initialMessageListener()
  }

  render() {
    const { Component, pageProps } = this.props
    const { isWaitForIframeLoaded, loading } = this.state
    return (
      <>
        <Provider store={store}>
          <Head>
            <title>HMS Widget SDK</title>
          </Head>
          <ThemeLayoutWithConnect>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {isWaitForIframeLoaded ? (
              loading ? (
                <LoadingSection />
              ) : (
                <Component {...pageProps} />
              )
            ) : (
              <Component {...pageProps} />
            )}
          </ThemeLayoutWithConnect>
        </Provider>
      </>
    )
  }
}

export default AASApp
