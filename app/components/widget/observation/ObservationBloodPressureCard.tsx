import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import useObservationList from '@components/hooks/useObservationList'
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
import clsx from 'clsx'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  bodyCard: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
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

const ObservationBloodPressureCard: React.FunctionComponent<{ query: any }> = ({
  query,
}) => {
  let params: IObservationListFilterQuery = {}

  if (_.get(query, 'patientId') && _.get(query, 'encounterId')) {
    params = {
      code: _.get(query, 'code') || '55284-4',
      encounterId: _.get(query, 'encounterId'),
      patientId: _.get(query, 'patientId'),
    }
  }

  const { isLoading, data: observationList, error } = useObservationList(
    {
      filter: params || {},
      max: 1,
    },
    { patientId: true },
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
    <Paper className={classes.paperContainer} elevation={5}>
      <Grid
        container
        justify='center'
        alignContent='center'
        className={classes.headerContainer}
      >
        <Typography variant='body1' className={classes.headerCardTitle}>
          Blood Pressure
        </Typography>
      </Grid>
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: '100%' }}
      >
        <Grid item xs={5} className={classes.iconContainer}>
          <Icon
            style={{ zoom: 3, color: '#c62828' }}
            className={clsx('fas fa-stethoscope', classes.iconCard)}
          />
        </Grid>
        <Grid
          xs={7}
          item
          container
          direction='column'
          style={{
            paddingRight: 16,
          }}
        >
          <Typography
            component='div'
            variant='body1'
            className={classes.bodyCard}
          >
            SYS :{' '}
            <div>
              <Typography
                component='span'
                variant='h5'
                className={classes.contentText}
              >
                {_.find(
                  _.get(observation, 'valueModal'),
                  value => value.code === 'Systolic Blood Pressure',
                )
                  ? Number(
                      _.find(
                        _.get(observation, 'valueModal'),
                        value => value.code === 'Systolic Blood Pressure',
                      ).value,
                    ).toFixed(2)
                  : 'N/A'}
              </Typography>{' '}
              <span>{_.get(observation, 'unit') || ''}</span>
            </div>
          </Typography>
          <Divider />
          <Typography
            component='div'
            variant='body1'
            className={classes.bodyCard}
          >
            DAI :{' '}
            <div>
              <Typography
                component='span'
                variant='h5'
                className={classes.contentText}
              >
                {_.find(
                  _.get(observation, 'valueModal'),
                  value => value.code === 'Diastolic Blood Pressure',
                )
                  ? Number(
                      _.find(
                        _.get(observation, 'valueModal'),
                        value => value.code === 'Diastolic Blood Pressure',
                      ).value,
                    ).toFixed(2)
                  : 'N/A'}
              </Typography>{' '}
              <span>{_.get(observation, 'unit') || ''}</span>
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
          {_.get(observation, 'issued')}
        </Typography>
      </Grid>
    </Paper>
  )
}
