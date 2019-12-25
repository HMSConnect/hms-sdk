import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import getConfig from 'next/config'
import {
  Grid,
  ListItem,
  ListItemText,
  List,
  Paper,
  ListSubheader
} from '@material-ui/core'

// const { staticFolder } = getConfig().publicRuntimeConfig
const config = getConfig()
const { staticFolder } = config ? config.publicRuntimeConfig : {}
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 18,
    width: '100%'
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxWidth: 360
  }
}))

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />
}

export default function App() {
  const classes = useStyles()
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
      <Grid
        className={classes.root}
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Paper className={classes.card}>
          <List
            component='nav'
            aria-label='main menu'
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                Main Menu
              </ListSubheader>
            }
          >
            <ListItemLink href='/patient-search'>
              <ListItemText primary='Demo App' />
            </ListItemLink>
            <ListItemLink href='/embeded-widget'>
              <ListItemText primary='Embedded Widget' />
            </ListItemLink>
          </List>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}
