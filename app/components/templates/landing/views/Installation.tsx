import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import MarkdownIt from 'markdown-it'
import Typography from '../modules/Typography'
import Highlight from 'react-highlight.js'

const md = MarkdownIt({ html: true })

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // backgroundColor: '#fff5f8',
      background: theme.palette.secondary.light,
      overflow: 'hidden',
    },
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(15),
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    highlight: {
      fontSize: 18,
      '& code': {
        borderRadius: '6px',
      },
      '& pre': {
        margin: 0,
      },
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
      marginBottom: theme.spacing(6),
    },
    title: {
      marginBottom: theme.spacing(6),
    },
    number: {
      fontSize: 24,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    image: {
      height: 55,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    curvyLines: {
      pointerEvents: 'none',
      position: 'absolute',
      top: -270,
      left: -80,
      transform: 'rotate(180deg)',
    },
    button: {
      marginTop: theme.spacing(8),
    },
    float: {
      zIndex: 10,
    },
  }),
)
const Installation: React.FunctionComponent<any> = (props) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src='../../../../static/images/landingCurvyLines.png'
          className={classes.curvyLines}
          alt='curvy lines'
        />
        <Typography
          variant='h4'
          marked='center'
          className={classes.title}
          component='h2'
        >
          <b>Installation</b>
        </Typography>
        <Grid container spacing={5} className={classes.float}>
          <Grid item xs={12} md={12}>
            <div className={classes.item}>
              <Typography variant='h5' align='center'>
                HMS-widget is prepare to use by add script to your html file
                <br />
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className={classes.highlight}>
              <Highlight language={'html'}>{installationHtml}</Highlight>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default Installation
const installationHtml =
  '<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@3528ecc5679e6c32090094d21bfb3fddea767583/sdk/iframe-sdk.min.js"></script>'
