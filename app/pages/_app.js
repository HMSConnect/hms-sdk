import * as React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'

import { AdapterManager } from '../adapters/DataAdapterManager'
import RouteManager from '../routes/RouteManager'
import { HMSService } from '../services/HMSServiceFactory' // Initial singleton HMSService
import * as _ from 'lodash'
import { ThemeProvider } from '@material-ui/core/styles'

// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'


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
        <Head>
          <title>HMS Widget SDK</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}

export default AASApp
