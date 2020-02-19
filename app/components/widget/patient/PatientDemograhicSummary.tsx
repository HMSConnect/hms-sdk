import * as React from 'react'

import { Grid, makeStyles, Theme } from '@material-ui/core'
import * as _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { cardClick } from '../../../actions/patientDemographic.action'
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
  const patientDemographicState = useSelector(
    (state: any) => state.patientDemographic,
  )
  const dispatch = useDispatch()
  const handleClickCard = (name: string) => {
    dispatch(cardClick(name))
  }
  return (
    <PatientDemographicSummaryView
      query={query}
      onClickCard={handleClickCard}
      selectedCard={_.get(patientDemographicState, 'selectedCard')}
    />
  )
}

export default PatientDemograhicSummary

export const PatientDemographicSummaryView: React.FunctionComponent<{
  query: any
  onClickCard?: any
  selectedCard?: string
}> = ({ query, onClickCard, selectedCard }) => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={classes.cardContent}
      >
        <ObservationBodyMeasurementCard
          query={{
            ...query,
            selectedCard: 'BLOOD_PRESSURE',
          }}
          onClick={onClickCard}
          selectedCard={selectedCard}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={classes.cardContent}
      >
        <ObservationBloodPressureCard
          query={query}
          onClick={onClickCard}
          selectedCard={selectedCard}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={classes.cardContent}
      >
        <ObservationTemperatureCard
          query={query}
          onClick={onClickCard}
          selectedCard={selectedCard}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={classes.cardContent}
      >
        <ObservationHeartbeatCard
          query={query}
          onClick={onClickCard}
          selectedCard={selectedCard}
        />
      </Grid>
    </Grid>
  )
}
