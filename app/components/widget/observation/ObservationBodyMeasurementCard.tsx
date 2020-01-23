import * as React from 'react'

import useObservationList from '@components/hooks/useObservationList'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import {
  CircularProgress,
  Divider,
  Grid,
  Icon,
  makeStyles,
  Paper,
  Theme,
  Typography,
  Tooltip,
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

const ObservationBodyMeasurementCard: React.FunctionComponent<{
  query: any
}> = ({ query }) => {
  let params: IObservationListFilterQuery = {}

  if (_.get(query, 'patientId') && _.get(query, 'encounterId')) {
    params = {
      codes: '8302-2,29463-7,39156-5',
      // codes: ['8302-2', '29463-7', '39156-5'],
      encounterId: _.get(query, 'encounterId'),
      patientId: _.get(query, 'patientId'),
    }
  }

  const { isLoading, data: observationList, error } = useObservationList({
    _lasted: true,
    filter: params || {},
  })
  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <>Error: {error}</>
  }
  return <ObservationBodyMeasurementCardView observations={observationList} />
}

export default ObservationBodyMeasurementCard

const ObservationBodyMeasurementCardView: React.FunctionComponent<{
  observations: any
}> = ({ observations }) => {
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
          Body Measurement
        </Typography>
      </Grid>
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: '100%' }}
      >
        <Grid item xs={4} className={classes.iconContainer}>
          <Icon className={clsx('fas fa-male', classes.iconCard)} />
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
          <Tooltip
            title={
              <Typography variant='body1'>
                {_.find(observations, { code: '8302-2' })
                  ? _.find(observations, { code: '8302-2' }).issued
                  : 'N/A'}
              </Typography>
            }
            placement='top-end'
            enterDelay={250}
            aria-label='add'
          >
            <Typography
              component='div'
              variant='body1'
              className={classes.bodyCard}
            >
              Height :{' '}
              <div>
                <Typography
                  component='span'
                  variant='h5'
                  className={classes.contentText}
                >
                  {' '}
                  {_.find(observations, { code: '8302-2' })
                    ? Number(
                        _.find(observations, { code: '8302-2' }).value,
                      ).toFixed(2)
                    : 'N/A'}
                </Typography>{' '}
                <span>
                  {_.find(observations, { code: '8302-2' })
                    ? _.find(observations, { code: '8302-2' }).unit
                    : ''}
                </span>
              </div>
            </Typography>
          </Tooltip>

          <Divider />
          <Tooltip
            title={
              <Typography variant='body1'>
                {_.find(observations, { code: '29463-7' })
                  ? _.find(observations, { code: '29463-7' }).issued
                  : 'N/A'}
              </Typography>
            }
            placement='top-end'
            enterDelay={250}
            aria-label='add'
          >
            <Typography
              component='div'
              variant='body1'
              className={classes.bodyCard}
            >
              Weight :{' '}
              <div>
                <Typography
                  component='span'
                  variant='h5'
                  className={classes.contentText}
                >
                  {' '}
                  {_.find(observations, { code: '29463-7' })
                    ? Number(
                        _.find(observations, { code: '29463-7' }).value,
                      ).toFixed(2)
                    : 'N/A'}{' '}
                </Typography>
                <span>
                  {_.find(observations, { code: '29463-7' })
                    ? _.find(observations, { code: '29463-7' }).unit
                    : ''}
                </span>
              </div>
            </Typography>
          </Tooltip>

          <Divider />
          <Tooltip
            title={
              <Typography variant='body1'>
                {_.find(observations, { code: '39156-5' })
                  ? _.find(observations, { code: '39156-5' }).issued
                  : 'N/A'}
              </Typography>
            }
            placement='top-end'
            enterDelay={250}
            aria-label='add'
          >
            <Typography
              component='div'
              variant='body1'
              className={classes.bodyCard}
            >
              BMI :{' '}
              <div>
                <Typography
                  component='span'
                  variant='h5'
                  className={classes.contentText}
                >
                  {' '}
                  {_.find(observations, { code: '39156-5' })
                    ? Number(
                        _.find(observations, { code: '39156-5' }).value,
                      ).toFixed(2)
                    : 'N/A'}{' '}
                </Typography>
                <span>
                  {_.find(observations, { code: '39156-5' })
                    ? _.find(observations, { code: '39156-5' }).unit
                    : ''}
                </span>
              </div>
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        container
        justify='center'
        alignContent='center'
        className={classes.footerContainer}
      >
        <Typography variant='body2' className={classes.headerCardTitle}>
          {observations
            ? _.get(_.maxBy(observations, 'issuedDate'), 'issued')
            : ''}
        </Typography>
      </Grid>
    </Paper>
  )
}
