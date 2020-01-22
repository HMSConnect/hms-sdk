import * as React from 'react'

import useObservationList from '@components/hooks/useObservationList'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import {
  CircularProgress,
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
const ObservationHeartbeatCard: React.FunctionComponent<{ query: any }> = ({
  query,
}) => {
  const params = {
    code: _.get(query, 'code') || '8867-4',
    encounterId: _.get(query, 'encounterId'),
    patientId: _.get(query, 'patientId'),
  } as IObservationListFilterQuery
  const { isLoading, data: observationList, error } = useObservationList({
    filter: params || {},
    max: 1,
  })
  if (isLoading) {
    return <CircularProgress />
  }
  if (error) {
    return <>Error: {error}</>
  }
  return <ObservationHeartbeatCardView observation={observationList[0]} />
}

export default ObservationHeartbeatCard

export const ObservationHeartbeatCardView: React.FunctionComponent<{
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
          Heartbeat
        </Typography>
      </Grid>
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: '100%' }}
      >
        <Grid item xs={6} className={classes.iconContainer}>
          <Icon
            style={{ zoom: 3, color: '#c62828' }}
            className={clsx('fas fa-heartbeat', classes.iconCard)}
          />
        </Grid>
        <Grid
          xs={6}
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
            <Typography
              variant='h4'
              className={classes.contentText}
              style={{ paddingRight: 8 }}
            >
              {_.get(observation, 'value') || 'N/A'}
            </Typography>
            {_.get(observation, 'unit') || 'BPM'}
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
