import * as React from 'react'

import { Grid, makeStyles, Theme } from '@material-ui/core'
import ObservationBloodPressureCard from '../observation/ObservationBloodPressureCard'
import ObservationBodyMeasurementCard from '../observation/ObservationBodyMeasurementCard'
import ObservationHeartbeatCard from '../observation/ObservationHeartbeatCard'
import ObservationTemperatureCard from '../observation/ObservationTemperatureCard'

const useStyles = makeStyles((theme: Theme) => ({
  bodyCard: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContainer: {
    display: 'flex',
  },
  cardContent: {
    height: 250,
    padding: theme.spacing(1),
  },
  contentText: {
    color: '#1b5e20',
  },
  footerContainer: { height: 36 },
  headerCardTitle: {
    color: 'grey',
  },
  headerContainer: { height: 64, backgroundColor: '#ddd4' },
  iconCard: {
    zoom: 3,
  },
  iconContainer: {
    textAlign: 'center',
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}))

const PatientDemograhicSummary: React.FunctionComponent<{
  query: any
  name?: string
}> = ({ query, name = 'patientDemographicSummary' }) => {
  return <PatientDemographicSummaryView query={query} />
}

export default PatientDemograhicSummary

export const PatientDemographicSummaryView: React.FunctionComponent<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={4}
        className={classes.cardContent}
      >
        <ObservationBodyMeasurementCard query={query} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={4}
        className={classes.cardContent}
      >
        <ObservationTemperatureCard query={query} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={4}
        className={classes.cardContent}
      >
        <ObservationBloodPressureCard query={query} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={4}
        className={classes.cardContent}
      >
        <ObservationHeartbeatCard query={query} />
      </Grid>
    </Grid>
  )
}
