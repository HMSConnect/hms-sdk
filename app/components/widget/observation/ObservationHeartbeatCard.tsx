import * as React from 'react'

import CardLayout from '@components/base/CardLayout'
import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import { Grid, Icon, makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import get from 'lodash/get'

const useStyles = makeStyles((theme: Theme) => ({
  bodyCard: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  clickable: {
    cursor: 'pointer',
  },
  contentText: {
    fontWeight: 'normal',
  },
  footerContainer: { height: 36, color: 'grey' },
  hover: {
    '&:hover': {
      backgroundColor: '#ddd4',
    },
    textDecoration: 'none',
  },
  infoIcon: {
    color: '#1976d2',
    zoom: 0.7,
  },
  selectedCard: {
    backgroundColor: '#ddd4',
    border: '2px solid #00b0ff',
    borderRadius: 4,
  },
  unitText: {
    fontWeight: 'normal',
  },
}))

const ObservationHeartbeatCard: React.FunctionComponent<{
  query: any
  onClick?: any
  selectedCard?: any
}> = ({ query, onClick, selectedCard }) => {
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
  return (
    <ObservationHeartbeatCardView
      observation={observationList[0]}
      onClick={onClick}
      selectedCard={selectedCard}
    />
  )
}

export default ObservationHeartbeatCard

export const ObservationHeartbeatCardView: React.FunctionComponent<{
  observation: any
  onClick?: any
  selectedCard?: any
}> = ({ observation, onClick, selectedCard }) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Heartbeat'
      Icon={
        <Icon
          style={{ color: '#c62828', paddingRight: 5 }}
          className={clsx('fas fa-heartbeat')}
        />
      }
    >
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: '100%' }}
      >
        <Grid xs={12} item container direction='column'>
          <Typography
            component='div'
            variant='body1'
            style={{
              paddingLeft: 16,
              paddingRight: 16,
            }}
            className={clsx(
              classes.bodyCard,
              classes.clickable,
              classes.hover,
              selectedCard === OBSERVATION_CODE.HEARTBEAT.value
                ? classes.selectedCard
                : null,
            )}
            onClick={() =>
              onClick ? onClick(OBSERVATION_CODE.HEARTBEAT.value) : null
            }
          >
            <Typography
              variant='h3'
              className={classes.contentText}
              style={{ paddingRight: 8 }}
            >
              {get(observation, 'value') || 'N/A'}
            </Typography>
            <Typography
              component='span'
              variant='h4'
              className={classes.unitText}
            >
              {get(observation, 'unit') || ''}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        justify='center'
        alignContent='center'
        className={classes.footerContainer}
      >
        <Typography variant='body2'>{get(observation, 'issued')}</Typography>
      </Grid>
    </CardLayout>
  )
}
