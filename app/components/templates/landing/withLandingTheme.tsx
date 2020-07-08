import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import landingTheme from './landingTheme'

export default function withLandingTheme(Component: any) {
  function WithLandingTheme(props: any) {
    return (
      <ThemeProvider theme={landingTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    )
  }

  return WithLandingTheme
}
