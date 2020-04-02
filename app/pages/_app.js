import * as React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import * as _ from 'lodash'
import App from 'next/app'
import Head from 'next/head'
import 'react-grid-layout/css/styles.css'
import { Provider, connect } from 'react-redux'
import 'react-resizable/css/styles.css'
import { AdapterManager } from '../adapters/DataAdapterManager'
import store from '../reducers-redux/index.reducer'
import RouteManager from '../routes/RouteManager'
import { GoogleAnalytics } from '../services/GoogleAnalyticsService'
import { MessageListenerService } from '../services/MessageListenerService'
// import theme from '../src/theme'
import ThemeManager from '../styles/ThemeManager'
import { themeChange, themeObjectSet } from '../actions/theme.action'

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
    ThemeManager.setDefaultTheme('normal')
    // let themeObject = ThemeManager.getThemeObject(props.router?.query?.theme)
    let isWaitForIframeLoaded
    if (typeof window !== 'undefined') {
      AdapterManager.createAdapter(_.get(props, 'router.query.mode'))
      isWaitForIframeLoaded =
        _.get(props, 'router.query.isWaitForIframeLoaded') || false
      const pathName = props.router.pathname
      RouteManager.registryMode(pathName)

      MessageListenerService.registerMessage('finishIframeLoading', () => {
        console.log('finishIframeLoading')
        this.setState({
          ...this.state,
          loading: false,
        })
      })
      // MessageListenerService.registerMessage('setTheme', data => {
      //   themeObject = ThemeManager.getThemeObject(data)
      //   this.setState({
      //     ...this.state,
      //     theme: themeObject,
      //   })
      // })
      // MessageListenerService.registerMessage('setCustomTheme', data => {
      //   themeObject = ThemeManager.mergeThemeWithCustomTheme(themeObject, data)
      //   this.setState({
      //     ...this.state,
      //     theme: themeObject,
      //   })
      // })
      MessageListenerService.registerMessage('setIframeName', data => {
        MessageListenerService.setIframeName(data)
      })

      MessageListenerService.initialMessageListener()
    }
    this.state = {
      // theme: themeObject,
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

  render() {
    // const theme = createMuiTheme({
    //   widgetType: 'tertriry',
    // })

    const { Component, pageProps } = this.props
    const { theme, isWaitForIframeLoaded, loading } = this.state
    return (
      <>
        <Provider store={store}>
          <Head>
            <title>HMS Widget SDK</title>
          </Head>
          <ThemeLayoutWithConnect>
            {/* <ThemeProvider theme={theme}> */}
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {isWaitForIframeLoaded ? (
              loading ? (
                <div>Loading...</div>
              ) : (
                <Component {...pageProps} />
              )
            ) : (
              <Component {...pageProps} />
            )}
            {/* <Component {...pageProps} /> */}
            {/* </ThemeProvider> */}
          </ThemeLayoutWithConnect>
        </Provider>
      </>
    )
  }
}

class ThemeLayout extends React.Component {
  constructor(props) {
    super(props)

    ThemeManager.setDefaultTheme('normal')
    props.onThemeSet(ThemeManager.getThemeObject(null))

    let themeObject = ThemeManager.getThemeObject(props.router?.query?.theme)
    if (typeof window !== 'undefined') {
      MessageListenerService.registerMessage('setTheme', data => {
        themeObject = ThemeManager.getThemeObject(data)
        props.onThemeSet(themeObject)
      })
      MessageListenerService.registerMessage('setCustomTheme', data => {
        themeObject = ThemeManager.mergeThemeWithCustomTheme(themeObject, data)
        props.onThemeSet(themeObject)
      })
    }
  }

  render() {
    const { themeType } = this.props

    if (!themeType.themeObject) {
      return <></>
    }
    return (
      <ThemeProvider theme={themeType.themeObject}>
        {this.props.children}
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    themeType: state.themeType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onThemeChange: theme => {
      dispatch(themeChange(theme))
    },
    onThemeSet: themeObject => {
      dispatch(themeObjectSet(themeObject))
    },
  }
}

const ThemeLayoutWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemeLayout)


export default AASApp
