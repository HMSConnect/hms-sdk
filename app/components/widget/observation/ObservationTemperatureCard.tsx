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
import CardLayout from '@components/base/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  bodyCard: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
  },
  contentText: {
    fontWeight: 450
  },
  unitText: {
    fontWeight: 450
  },
  footerContainer: { height: 36, color: 'grey' }
}))

const ObservationTemperatureCard: React.FunctionComponent<any> = ({
  query,
}) => {
  const params = {
    code: OBSERVATION_CODE.BODY_TEMPERATURE.code,
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
  return <ObservationTemperatureCardView observation={observationList[0]} />
}

export default ObservationTemperatureCard
export const ObservationTemperatureCardView: React.FunctionComponent<any> = ({
  observation,
}) => {
  const classes = useStyles()
  return (
    <CardLayout header='Temperature' Icon={<Icon
      style={{ color: '#cddc39' }}
      className={clsx('fas fa-thermometer-quarter')}
    />}>
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
            <div>
              <Typography
                component='span'
                variant='h5'
                className={classes.contentText}
                style={{ paddingRight: 8 }}
              >
                {get(observation, 'value') || 'N/A'}
              </Typography>{' '}
              <Typography component='span' variant='body1' className={classes.unitText}>
                {get(observation, 'unit') || ''}
              </Typography>
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
        <Typography variant='body2' >
          {get(observation, 'issued') || ''}
        </Typography>
      </Grid>

    </CardLayout>
  )
}
