import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
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
import get from 'lodash/get'

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
const ObservationHeartbeatCard: React.FunctionComponent<{ query: any }> = ({
  query,
}) => {
  const params = {
    code: OBSERVATION_CODE.HEARTBEAT.code,
    encounterId: get(query, 'encounterId'),
    patientId: get(query, 'patientId'),
  } as IObservationListFilterQuery
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
  return <ObservationHeartbeatCardView observation={observationList[0]} />
}

export default ObservationHeartbeatCard

export const ObservationHeartbeatCardView: React.FunctionComponent<{
  observation: any
}> = ({ observation }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paperContainer} elevation={1}>
      <Grid container alignItems='center' className={classes.headerContainer}>
        <Grid item xs={2} style={{ paddingLeft: '1em' }}>
          <Typography variant='body1'>
            <Icon
              style={{ color: '#c62828', paddingRight: 5 }}
              className={clsx('fas fa-heartbeat')}
            />
          </Typography>
        </Grid>
        <Grid item xs={10} style={{ paddingRight: '1em' }}>
          <Grid container justify='flex-end'>
            <Typography variant='body1' className={classes.headerCardTitle}>
              Heartbeat
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
        {/* <Grid item xs={6} className={classes.iconContainer}>
          <Icon
            style={{ zoom: 3, color: '#c62828' }}
            className={clsx('fas fa-heartbeat', classes.iconCard)}
          />
        </Grid> */}
        <Grid
          xs={12}
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
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='h5'
              className={classes.contentText}
              style={{ paddingRight: 8 }}
            >
              {get(observation, 'value') || 'N/A'}
            </Typography>
            {get(observation, 'unit') || ''}
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
