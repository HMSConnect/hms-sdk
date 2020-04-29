import React from 'react'

import ButtonBase from '@material-ui/core/ButtonBase'
import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '../modules/Typography'
import { Link } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    images: {
      display: 'flex',
      marginTop: theme.spacing(8),
      flexWrap: 'wrap',
    },
    imageWrapper: {
      display: 'block',
      padding: 0,
      position: 'relative',
      borderRadius: 0,
      border: '0.4px solid currentColor',
      height: '40vh',
      [theme.breakpoints.down('sm')]: {
        height: 100,
        width: '100% !important',
      },
      '&:hover': {
        zIndex: 1,
      },
      '&:hover $imageBackdrop': {
        opacity: 0.15,
      },
      '&:hover $imageMarked': {
        opacity: 0,
      },
      '&:hover $imageTitle': {
        border: '4px solid currentColor',
      },
    },
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
      // backgroundPosition: 'center 40%'
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      background: theme.palette.common.black,
      opacity: 0.3,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      background: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(8),
    },
  }),
)

const WidgetGallery: React.FunctionComponent<any> = (props) => {
  const classes = useStyles()

  const images = [
    {
      clickPath: '/embedded-widget?widget=patient-demographic',
      title: 'Demographic',
      url: '../../../../static/images/gallery/patientDemographic.png',
      width: '40%',
    },
    {
      clickPath: '/embedded-widget?widget=patient-encounter-timeline',
      title: 'Encounter',
      url: '../../../../static/images/gallery/encounter.png',
      width: '60%',
    },
    {
      clickPath: '/embedded-widget?widget=patient-search',
      title: 'Search',
      url: '../../../../static/images/gallery/patientSearchDark.png',
      width: '35%',
    },

    {
      clickPath: '/embedded-widget?widget=observaion-blood-pressure-graph',
      title: 'Graph',
      url: '../../../../static/images/gallery/bloodPressureGraph.png',
      width: '38%',
    },
    {
      clickPath: '/embedded-widget?widget=observation-body-measurement-card',
      title: 'Observation Card',
      url: '../../../../static/images/gallery/bodyMeasurementCard.png',
      width: '27%',
    },
    {
      clickPath: '/embedded-widget?widget=patient-condition-table',
      title: 'Table',
      url: '../../../../static/images/gallery/condition.png',
      width: '40%',
    },
    {
      clickPath: '/embedded-widget?widget=observation-summary-graph',
      title: 'Summary',
      url: '../../../../static/images/gallery/summaryGraphDark.png',
      width: '60%',
    },
    // {
    //   url:
    //     'https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400&q=80',
    //   title: 'Reading',
    //   width: '40%',
    // },
  ]

  return (
    <Container className={classes.root} component='section'>
      <Typography variant='h4' marked='center' align='center' component='h2'>
        <b>Widget Gallery</b>
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <Link href={`${image.clickPath}`}>
              <div
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <div className={classes.imageBackdrop} />
              <div className={classes.imageButton}>
                <Typography
                  component='h3'
                  variant='h6'
                  color='inherit'
                  className={classes.imageTitle}
                >
                  {image.title}
                  <div className={classes.imageMarked} />
                </Typography>
              </div>
            </Link>
          </ButtonBase>
        ))}
      </div>
    </Container>
  )
}
export default WidgetGallery
