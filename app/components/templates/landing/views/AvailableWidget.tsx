import React from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '../modules/Typography'
import Button from '../modules/Button'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { IconButton, Collapse, Link } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import {
  widgetGalleryPatientConfig,
  widgetGalleryObservationConfig,
} from '@config/embedded-widget'
import { IWidgetGroup } from '@config'

import * as _ from 'lodash'

const WIDGET_GROUP: any = [
  ...widgetGalleryPatientConfig.child,
  ...widgetGalleryObservationConfig.child,
]
const lengthDefault = 6
const WIDGET_DEFAULT_GROUP = _.slice(WIDGET_GROUP, 0, lengthDefault)
const WIDGET_COLLASP_GROUP = _.slice(
  WIDGET_GROUP,
  lengthDefault,
  WIDGET_GROUP.length,
)
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      background: theme.palette.secondary.light,
      overflow: 'hidden',
    },
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(15),
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
    },
    title: {
      marginBottom: theme.spacing(10),
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
    icon: {
      zoom: 1.5,
    },
    iconContainer: {
      marginTop: theme.spacing(4),
    },
    curvyLines: {
      pointerEvents: 'none',
      position: 'absolute',
      top: -180,
      opacity: 0.7,
    },
    button: {
      marginTop: theme.spacing(8),
    },
  }),
)

const AvailableWidget: React.FunctionComponent<any> = (props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickShow = () => {
    setOpen(!open)
  }
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()
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
          align='center'
        >
          <b>Available Widget</b>
        </Typography>
        <Grid container spacing={5}>
          {_.map(WIDGET_DEFAULT_GROUP, (widget: any, index) => (
            <Grid item xs={12} md={4} key={`default-${index}`}>
              <div className={classes.item}>
                <Typography component='div' variant='h5' align='center'>
                  <Link
                    href={`/embedded-widget?widget=${widget.value}`}
                    color='textPrimary'
                  >
                    {widget.label}
                  </Link>
                </Typography>
              </div>
            </Grid>
          ))}
          <Grid item xs={12} md={12}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Grid container spacing={5}>
                {_.map(WIDGET_COLLASP_GROUP, (widget: any, index) => (
                  <Grid item xs={12} md={4} key={`default-${index}`}>
                    <div className={classes.item}>
                      <Typography component='a' variant='h5' align='center'>
                        <Link
                          href={`/embedded-widget?widget=${widget.value}`}
                          color='textPrimary'
                        >
                          {widget.label}
                        </Link>
                      </Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        <Typography align='center' className={classes.iconContainer}>
          <IconButton
            edge='end'
            aria-label='show all'
            onClick={() => handleClickShow()}
            className={classes.icon}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Typography>
      </Container>
    </section>
  )
}

export default AvailableWidget
