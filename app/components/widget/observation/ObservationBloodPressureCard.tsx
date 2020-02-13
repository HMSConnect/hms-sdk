import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import {
  Divider,
  Grid,
  Icon,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import find from 'lodash/find'
import get from 'lodash/get'

const useStyles = makeStyles((theme: Theme) => ({
  bodyCard: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
  },
  contentText: {
    color: '#1b5e20',
    // fontSize: '2rem',
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

const ObservationBloodPressureCard: React.FunctionComponent<{ query: any }> = ({
  query,
}) => {
  const params: IObservationListFilterQuery = {
    code: OBSERVATION_CODE.BLOOD_PRESSURE.code,
    encounterId: get(query, 'encounterId'),
    patientId: get(query, 'patientId'),
  }
  const { isLoading, data: observationList, error } = useObservationList(
    {
      filter: params || {},
      max: 1,
    },
    ['patientId'],
  )

  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading) {
    return <LoadingSection />
  }
  return <ObservationBloodPressureCardView observation={observationList[0]} />
}

export default ObservationBloodPressureCard

export const ObservationBloodPressureCardView: React.FunctionComponent<{
  observation: any
}> = ({ observation }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paperContainer} elevation={1}>
      <Grid container alignItems='center' className={classes.headerContainer}>
        <Grid item xs={3} style={{ paddingLeft: '1em' }}>
          <Typography variant='body1'>
            <Icon
              style={{ color: '#c62828fa' }}
              className={'fas fa-stethoscope'}
            />
          </Typography>
        </Grid>
        <Grid item xs={9} style={{ paddingRight: '1em' }}>
          <Grid container justify='flex-end'>
            <Typography variant='body1' className={classes.headerCardTitle}>
              Blood Pressure
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: '100%' }}
      >
        <Grid
          xs={12}
          item
          container
          direction='column'
          style={{
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Typography
            component='div'
            variant='body2'
            className={classes.bodyCard}
          >
            SYS{' '}
            <div>
              <Typography
                component='span'
                variant='h5'
                className={classes.contentText}
              >
                {find(
                  get(observation, 'valueModal'),
                  value => value.code === 'Systolic Blood Pressure',
                )
                  ? Number(
                      find(
                        get(observation, 'valueModal'),
                        value => value.code === 'Systolic Blood Pressure',
                      ).value,
                    ).toFixed(2)
                  : 'N/A'}
              </Typography>{' '}
              <span>{get(observation, 'unit') || ''}</span>
            </div>
          </Typography>
          <Divider />
          <Typography
            component='div'
            variant='body2'
            className={classes.bodyCard}
          >
            DAI{' '}
            <div>
              <Typography
                component='span'
                variant='h5'
                className={classes.contentText}
              >
                {find(
                  get(observation, 'valueModal'),
                  value => value.code === 'Diastolic Blood Pressure',
                )
                  ? Number(
                      find(
                        get(observation, 'valueModal'),
                        value => value.code === 'Diastolic Blood Pressure',
                      ).value,
                    ).toFixed(2)
                  : 'N/A'}
              </Typography>{' '}
              <span>{get(observation, 'unit') || ''}</span>
            </div>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        justify='center'
        alignContent='center'
        className={classes.footerContainer}
      >
        <Typography variant='body2' className={classes.headerCardTitle}>
          {get(observation, 'issued')}
        </Typography>
      </Grid>
    </Paper>
  )
}
