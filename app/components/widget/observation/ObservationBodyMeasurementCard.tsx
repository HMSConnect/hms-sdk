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
  Tooltip,
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

const ObservationBodyMeasurementCard: React.FunctionComponent<{
  query: any
}> = ({ query }) => {
  let params: IObservationListFilterQuery = {}

  params = {
    codes: `${OBSERVATION_CODE.BODY_HEIGHT.code},${OBSERVATION_CODE.BODY_WEIGHT.code},${OBSERVATION_CODE.BODY_MASS_INDEX.code}`,
    // codes: '8302-2,29463-7,39156-5',
    // codes: ['8302-2', '29463-7', '39156-5'],
    encounterId: _.get(query, 'encounterId'),
    patientId: _.get(query, 'patientId'),
  }

  const { isLoading, data: observationList, error } = useObservationList(
    {
      _lasted: true,
      filter: params || {},
    },
    ['patientId'],
  )
  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading) {
    return <LoadingSection />
  }
  return <ObservationBodyMeasurementCardView observations={observationList} />
}

export default ObservationBodyMeasurementCard

const ObservationBodyMeasurementCardView: React.FunctionComponent<{
  observations: any
}> = ({ observations }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paperContainer} elevation={1}>
      <Grid container alignItems='center' className={classes.headerContainer}>
        <Grid item xs={2} style={{ paddingLeft: '1em' }}>
          <Typography variant='body1'>
            <Icon className={clsx('fas fa-male')} />
          </Typography>
        </Grid>
        <Grid item xs={10} style={{ paddingRight: '1em' }}>
          <Grid container justify='flex-end'>
            <Typography variant='body1' className={classes.headerCardTitle}>
              Body Measurement
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
        {/* <Grid item xs={4} className={classes.iconContainer}>
          <Icon className={clsx('fas fa-male', classes.iconCard)} />
        </Grid> */}

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
          <Tooltip
            title={
              <Typography variant='body1'>
                {_.find(observations, {
                  code: OBSERVATION_CODE.BODY_HEIGHT.code,
                })
                  ? _.find(observations, {
                      code: OBSERVATION_CODE.BODY_HEIGHT.code,
                    }).issued
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
              Height{' '}
              <div>
                <Typography
                  component='span'
                  variant='h5'
                  className={classes.contentText}
                >
                  {' '}
                  {_.find(observations, {
                    code: OBSERVATION_CODE.BODY_HEIGHT.code,
                  })
                    ? Number(
                        _.find(observations, {
                          code: OBSERVATION_CODE.BODY_HEIGHT.code,
                        }).value,
                      ).toFixed(2)
                    : 'N/A'}
                </Typography>{' '}
                <span>
                  {_.find(observations, {
                    code: OBSERVATION_CODE.BODY_HEIGHT.code,
                  })
                    ? _.find(observations, {
                        code: OBSERVATION_CODE.BODY_HEIGHT.code,
                      }).unit
                    : ''}
                </span>
              </div>
            </Typography>
          </Tooltip>

          <Divider />
          <Tooltip
            title={
              <Typography variant='body1'>
                {_.find(observations, {
                  code: OBSERVATION_CODE.BODY_WEIGHT.code,
                })
                  ? _.find(observations, {
                      code: OBSERVATION_CODE.BODY_WEIGHT.code,
                    }).issued
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
              Weight{' '}
              <div>
                <Typography
                  component='span'
                  variant='h5'
                  className={classes.contentText}
                >
                  {' '}
                  {_.find(observations, {
                    code: OBSERVATION_CODE.BODY_WEIGHT.code,
                  })
                    ? Number(
                        _.find(observations, {
                          code: OBSERVATION_CODE.BODY_WEIGHT.code,
                        }).value,
                      ).toFixed(2)
                    : 'N/A'}{' '}
                </Typography>
                <span>
                  {_.find(observations, {
                    code: OBSERVATION_CODE.BODY_WEIGHT.code,
                  })
                    ? _.find(observations, {
                        code: OBSERVATION_CODE.BODY_WEIGHT.code,
                      }).unit
                    : ''}
                </span>
              </div>
            </Typography>
          </Tooltip>

          <Divider />
          <Tooltip
            title={
              <Typography variant='body1'>
                {_.find(observations, {
                  code: OBSERVATION_CODE.BODY_MASS_INDEX.code,
                })
                  ? _.find(observations, {
                      code: OBSERVATION_CODE.BODY_MASS_INDEX.code,
                    }).issued
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
              BMI{' '}
              <div>
                <Typography
                  component='span'
                  variant='h5'
                  className={classes.contentText}
                >
                  {' '}
                  {_.find(observations, {
                    code: OBSERVATION_CODE.BODY_MASS_INDEX.code,
                  })
                    ? Number(
                        _.find(observations, {
                          code: OBSERVATION_CODE.BODY_MASS_INDEX.code,
                        }).value,
                      ).toFixed(2)
                    : 'N/A'}{' '}
                </Typography>
                <span>
                  {_.find(observations, {
                    code: OBSERVATION_CODE.BODY_MASS_INDEX.code,
                  })
                    ? _.find(observations, {
                        code: OBSERVATION_CODE.BODY_MASS_INDEX.code,
                      }).unit
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
