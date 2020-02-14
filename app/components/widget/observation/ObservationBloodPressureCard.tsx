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
import CardLayout, { CardHeader } from '@components/base/CardLayout'

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
    <CardLayout header='Blood Pressure' Icon={<Icon
      style={{ color: '#c62828fa' }}
      className={'fas fa-stethoscope'}
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
            <Typography
              variant='body2'
            >
              SYS{' '}
            </Typography>
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
              <Typography component='span'
                variant='body1'
                className={classes.unitText}>{get(observation, 'unit') || ''}</Typography>
            </div>
          </Typography>
          <Divider />
          <Typography
            component='div'
            variant='body2'
            className={classes.bodyCard}
          >
            <Typography
              variant='body2'
            >
              DAI{' '}
            </Typography>
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
              <Typography component='span'
                variant='body1'
                className={classes.unitText}>{get(observation, 'unit') || ''}</Typography>
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
          {get(observation, 'issued')}
        </Typography>
      </Grid>
    </CardLayout>
  )
}
