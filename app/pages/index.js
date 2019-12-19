import React from 'react'

import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import getConfig from 'next/config'

import { Link } from '../routes'

// const { staticFolder } = getConfig().publicRuntimeConfig
const config = getConfig()
const { staticFolder } = config ? config.publicRuntimeConfig : {}
const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}))

export default function App() {
  const brandObjs = {
    favicon: {
      name: 'HMS Widget SDK',
      alt: 'favicon',
      src: `${staticFolder}/static/images/favicon.png`
    },
    hms_widget_sdk: {
      name: 'HMS Widget SDK',
      alt: 'HMS Widget SDK',
      src: `${staticFolder}/static/images/favicon.png`
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Link href='/patient-search'>Patient search</Link>
      </Container>
      <Container maxWidth='lg'>
        <Link href='/embeded-widget'>Embeded Widget</Link>
      </Container>
    </React.Fragment>
  )
}
