import * as React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import * as _ from 'lodash'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { AdapterManager } from '../adapters/DataAdapterManager'
import store from '../reducers-redux/index.reducer'
import RouteManager from '../routes/RouteManager'
import theme from '../src/theme'



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
    if (typeof window !== 'undefined') {
      AdapterManager.createAdapter(_.get(props, 'router.query.mode'))
      const pathName = props.router.pathname
      RouteManager.registryMode(pathName)
    }
  }
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Provider store={store}>
          <Head>
            <title>HMS Widget SDK</title>
          </Head>
          {/* <AppContextProvider> */}
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
          {/* </AppContextProvider> */}
        </Provider>
      </>
    )
  }
}

export default AASApp
