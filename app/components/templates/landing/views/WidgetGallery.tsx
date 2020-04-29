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
import {
  IconButton,
  Collapse,
  Link,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import {
  widgetGalleryPatientConfig,
  widgetGalleryObservationConfig,
} from '@config/embedded-widget'
import { IWidgetGroup } from '@config'

import * as _ from 'lodash'

import WIDGET_GALLERY from '../widgetGallery.json'
import routes from '../../../../routes'

const lengthDefault = 6
const WIDGET_DEFAULT_GROUP = _.slice(WIDGET_GALLERY.widget, 0, lengthDefault)
const WIDGET_COLLASP_GROUP = _.slice(
  WIDGET_GALLERY.widget,
  lengthDefault,
  WIDGET_GALLERY.widget.length,
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

const WidgetGallery: React.FunctionComponent<any> = (props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickShow = () => {
    setOpen(!open)
  }

  const handleCardClick = (path: string) => {
    routes.Router.pushRoute(path)
  }
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/* <img
          src='../../../../static/images/landingCurvyLines.png'
          className={classes.curvyLines}
          alt='curvy lines'
        /> */}
        <Typography
          variant='h4'
          marked='center'
          className={classes.title}
          component='h2'
          align='center'
        >
          <b>Widget Gallery</b>
        </Typography>
        <Grid container spacing={5}>
          {_.map(WIDGET_DEFAULT_GROUP, (widget: any, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={`default-${index}`}
              style={{ zIndex: 10 }}
            >
              <Card>
                <CardActionArea onClick={() => handleCardClick(widget.path)}>
                  <CardMedia
                    component='img'
                    alt='Contemplative Reptile'
                    height='230'
                    image={widget.pathImage}
                    title='Contemplative Reptile'
                    style={{ borderBottom: '1px solid black' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {widget.label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} md={12}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Grid container spacing={5}>
                {_.map(WIDGET_COLLASP_GROUP, (widget: any, index) => (
                  <Grid item xs={12} md={4} key={`default-${index}`}>
                    <Card>
                      <CardActionArea
                        onClick={() => handleCardClick(widget.path)}
                      >
                        <CardMedia
                          component='img'
                          alt='Contemplative Reptile'
                          height='230'
                          image={widget.pathImage}
                          title='Contemplative Reptile'
                          style={{ borderBottom: '1px solid black' }}
                        />
                        <CardContent>
                          <Typography gutterBottom variant='h5' component='h2'>
                            {widget.label}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
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

export default WidgetGallery
