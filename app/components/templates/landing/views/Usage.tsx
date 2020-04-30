import React from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '../modules/Typography'
import Button from '../modules/Button'
import * as _ from 'lodash'
import MarkdownIt from 'markdown-it'
import clsx from 'clsx'
import Highlight from 'react-highlight.js'
import Highlighter from '@components/base/Highlighter'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // backgroundColor: '#fff5f8',
      overflow: 'hidden',
    },
    paperContainer: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(15),
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    gridCellContainer: {
      overflow: 'auto',
      height: ' 450px',
    },
    gridImportantContainer: {
      overflow: 'auto',
      height: '500px',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
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
      width: '100%',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    highlight: {
      fontSize: 16,
      '& code': {
        borderRadius: '6px',
      },
      '& pre': {
        margin: 0,
      },
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
const Usage: React.FunctionComponent<any> = (props) => {
  const classes = useStyles()
  const theme: Theme = useTheme()
  return (
    <section className={classes.root}>
      <a id='usage' />
      <Container className={classes.container}>
        <Typography
          variant='h4'
          marked='center'
          className={classes.title}
          component='h2'
        >
          <b>Usage</b>
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <Typography variant='h5' align='center'>
              HMS-widget is designed to easy usage by has Iframe-sdk help
            </Typography>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <Grid container spacing={5}>
          <Grid className={classes.gridCellContainer} item xs={12} md={6}>
            <Paper
              elevation={3}
              className={clsx(classes.item, classes.paperContainer)}
            >
              <img
                src='../../../../static/images/demographicUsage.png'
                alt='suitcase'
                className={classes.image}
              />
            </Paper>
          </Grid>
          <Grid
            className={clsx(classes.gridCellContainer, classes.highlight)}
            item
            xs={12}
            md={6}
          >
            <Highlight language={'html'}>{usageHtml}</Highlight>
          </Grid>
        </Grid>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <Typography variant='h5'>
              <b>Important:</b> For all example, we will use patient which has
              ID{' '}
              <Highlighter
                text='0debf275-d585-4897-a8eb-25726def1ed5'
                highlightText='0debf275-d585-4897-a8eb-25726def1ed5'
                optionStyle={{
                  color: theme.palette.secondary.contrastText,
                  backgroundColor: theme.palette.secondary.main,
                }}
              />{' '}
              as reference data to render widget. You can get these patient's
              information like ID by use patient-search widget
            </Typography>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container spacing={5}>
          <Grid className={classes.gridImportantContainer} item xs={12} md={6}>
            <Paper
              elevation={3}
              className={clsx(classes.item, classes.paperContainer)}
            >
              <img
                src='../../../../static/images/patientSearchHigilight.png'
                alt='suitcase'
                className={classes.image}
              />
            </Paper>
          </Grid>
          <Grid
            className={clsx(classes.gridImportantContainer, classes.highlight)}
            item
            xs={12}
            md={6}
          >
            <Highlight language={'html'}>{patientSearchHtml}</Highlight>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default Usage

const usageHtml = `<!DOCTYPE html>
<html>
  <head>
    <title>Document</title>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@3528ecc5679e6c32090094d21bfb3fddea767583/sdk/iframe-sdk.min.js"
    ></script>
  </head>
  <body>
    <div id="widget-example1">
      --- iframe rendered here 1 ---
      <br />
    </div>
​
    <script>
      const widget1 = window.hmsWidgetAsyncInit(function (hmsWidget) {
        hmsWidget.init({
          selector: "widget-example1",
          widgetPath: "patient-info/patient-demographic",
        });
        hmsWidget.setParams({
          patientId: "0debf275-d585-4897-a8eb-25726def1ed5",
        });
      });
    </script>
  </body>
</html>
`

const patientSearchHtml = `<!DOCTYPE html>
<html>
  <head>
    <title>Document</title>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@3528ecc5679e6c32090094d21bfb3fddea767583/sdk/iframe-sdk.min.js"
    ></script>
  </head>
  <body>
    <div id="widget-example1"></div>
    ​
    <script>
      const widget1 = window.hmsWidgetAsyncInit(function (hmsWidget) {
        hmsWidget.init({
          selector: "widget-example1",
          widgetPath: "patient-search",
          width: "800px",
          height: "500px",
          pathPrefix: "embedded-widget",
        });
        hmsWidget.setParams({
          patientId: "0debf275-d585-4897-a8eb-25726def1ed5",
        });
      });
    </script>
  </body>
</html>
`
