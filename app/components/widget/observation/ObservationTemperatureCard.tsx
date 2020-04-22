import * as React from 'react'

import { cardClick } from '@app/actions/patientsummaryCards.action'
import CardLayout from '@components/base/CardLayout'
import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import { Grid, Icon, makeStyles, Theme, Typography } from '@material-ui/core'
import { lighten } from '@material-ui/core/styles'
import { sendMessage } from '@utils'
import clsx from 'clsx'
import _ from 'lodash'
import get from 'lodash/get'
import { useDispatch, useSelector } from 'react-redux'

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
  footerContainer: { height: 36, color: theme.palette.text.secondary },
  headerCard: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette?.senary?.dark
        : theme.palette?.senary?.light,
    color: theme.palette.senary?.main || '',
  },
  hover: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    textDecoration: 'none',
  },
  iconCard: {
    color:
        theme.palette.type === 'dark'
          ? theme.palette?.senary?.main
          : theme.palette?.senary?.dark,
  },
  infoIcon: {
    color: '#1976d2',
    zoom: 0.7,
  },
  selectedCard: {
    backgroundColor: theme.palette.action.selected,
    border: `2px solid ${theme.palette.action.active}`,
    borderRadius: 4,
  },
  unitText: {
    fontWeight: 'normal',
  },
}))

export const ObservationTemperatureCardWithConnector: React.FunctionComponent<{
  patientId?: string
  mouseTrackCategory?: string
  encounterId?: string
  name?: string
  isSelectable?: boolean
}> = ({
  patientId,
  encounterId,
  name,
  mouseTrackCategory,
  isSelectable = true,
}) => {
  const state = useSelector((state: any) => ({
    observationTemperatureCard: state.observationTemperatureCard,
    patientSummaryCards: state.patientSummaryCards,
  }))
  const dispatch = useDispatch()
  const handleCardClick = (cardName: string) => {
    dispatch(cardClick(cardName))
    sendMessage({
      message: 'handleCardClick',
      name,
      params: {
        cardName,
      },
    })
  }

  return (
    <ObservationTemperatureCard
      key={`ObservationTemperatureCard${
        encounterId || state.observationTemperatureCard.encounterId
      }`}
      patientId={patientId || state.observationTemperatureCard.patientId}
      encounterId={encounterId || state.observationTemperatureCard.encounterId}
      mouseTrackCategory={
        mouseTrackCategory ||
        state.observationTemperatureCard.mouseTrackCategory
      }
      onClick={handleCardClick}
      selectedCard={_.get(state, 'patientSummaryCards.selectedCard')}
      isSelectable={isSelectable}
    />
  )
}

const ObservationTemperatureCard: React.FunctionComponent<{
  patientId: string
  encounterId: string
  onClick?: any
  selectedCard?: any
  mouseTrackCategory?: string
  mouseTrackLabel?: string
  isSelectable?: boolean
}> = ({
  patientId,
  encounterId,
  onClick,
  selectedCard,
  mouseTrackCategory = 'observaion_temperature_card',
  mouseTrackLabel = 'observaion_temperature_card',
  isSelectable = true,
}) => {
  const params = {
    code: OBSERVATION_CODE.BODY_TEMPERATURE.code,
    encounterId,
    patientId,
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
  const handleCardClick = (cardName: any, cardCode?: string) => {
    if (!isSelectable) {
      return
    }
    if (onClick) {
      onClick(cardName)
    }
    sendMessage({
      message: 'handleCardClick',
      name,
      params: {
        cardCode,
        cardName,
      },
    })
  }

  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div style={{ height: '100%' }}>
        <ObservationTemperatureCardView
          observation={observationList[0]}
          onClick={handleCardClick}
          selectedCard={selectedCard}
          isSelectable={isSelectable}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default ObservationTemperatureCard
export const ObservationTemperatureCardView: React.FunctionComponent<{
  observation: any
  onClick?: any
  selectedCard?: any
  isSelectable?: boolean
}> = ({ observation, onClick, selectedCard, isSelectable }) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Temperature'
      Icon={
        <Icon
          className={clsx('fas fa-thermometer-quarter', classes.iconCard)}
        />
      }
      option={{
        headerClass: classes.headerCard,
        isHideIcon: true,
      }}
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
              isSelectable ? [classes.clickable, classes.hover] : null,
              selectedCard === OBSERVATION_CODE.BODY_TEMPERATURE.value
                ? classes.selectedCard
                : null,
            )}
            onClick={() =>
              onClick
                ? onClick(
                    OBSERVATION_CODE.BODY_TEMPERATURE.value,
                    OBSERVATION_CODE.BODY_TEMPERATURE.code,
                  )
                : null
            }
          >
            <div>
              <Typography
                component='span'
                variant='h4'
                className={classes.contentText}
                style={{
                  color: get(observation, 'value') ? undefined : 'gray',
                  paddingRight: 8,
                }}
              >
                {get(observation, 'value') || 'N/A'}
              </Typography>{' '}
              <Typography
                component='span'
                variant='h5'
                className={classes.unitText}
              >
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
        <Typography variant='body2'>
          {get(observation, 'issued') || ''}
        </Typography>
      </Grid>
    </CardLayout>
  )
}
