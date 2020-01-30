import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import useObservationList from '@components/hooks/useObservationList'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import {
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

const ObservationTemperatureCard: React.FunctionComponent<any> = ({
  query,
}) => {
  const params = {
    code: _.get(query, 'code') || '8310-5',
    encounterId: _.get(query, 'encounterId'),
    patientId: _.get(query, 'patientId'),
  } as IObservationListFilterQuery
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
  return <ObservationTemperatureCardView observation={observationList[0]} />
}

export default ObservationTemperatureCard
export const ObservationTemperatureCardView: React.FunctionComponent<any> = ({
  observation,
}) => {
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
          Temperature
        </Typography>
      </Grid>
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: '100%' }}
      >
        <Grid item xs={4} className={classes.iconContainer}>
          <Icon
            style={{ zoom: 3, color: '#cddc39' }}
            className={clsx('fas fa-thermometer-quarter', classes.iconCard)}
          />
        </Grid>
        <Grid
          xs={8}
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
            style={{
              alignItems: 'flex-end',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div>
              <Typography
                component='span'
                variant='h5'
                className={classes.contentText}
                style={{ paddingRight: 8 }}
              >
                {_.get(observation, 'value') || 'N/A'}
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
          {_.get(observation, 'issued') || ''}
        </Typography>
      </Grid>
    </Paper>
  )
}
