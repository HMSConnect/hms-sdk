import * as React from 'react'

import { cardClick } from '@app/actions/patientsummaryCards.action'
import CardLayout from '@components/base/CardLayout'
import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import {
  Divider,
  Grid,
  Icon,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { sendMessage } from '@utils'
import clsx from 'clsx'
import _ from 'lodash'
import find from 'lodash/find'
import get from 'lodash/get'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => {
  return {
    bodyCard: {
      alignItems: 'flex-end',
      display: 'flex',
      justifyContent: 'space-between',
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
          ? theme.palette?.tertiary?.dark
          : theme.palette?.tertiary?.light,
      color: theme.palette.tertiary?.main || '',
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
          ? theme.palette?.tertiary?.main
          : theme.palette?.tertiary?.dark,
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
    topicTitle: {
      color: theme.palette.text.secondary,
    },
    unitText: {
      fontWeight: 'normal',
    },
  }
})

export const ObservationBloodPressureCardWithConnector: React.FunctionComponent<{
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
  const state = useSelector((state: any) => {
    return {
      observationBloodPressureCard: state.observationBloodPressureCard,
      patientSummaryCards: state.patientSummaryCards,
    }
  })
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
    <ObservationBloodPressureCard
      key={`ObservationBloodPressureCard${
        encounterId || state.observationBloodPressureCard.encounterId
      }`}
      patientId={patientId || state.observationBloodPressureCard.patientId}
      mouseTrackCategory={
        mouseTrackCategory ||
        state.observationBloodPressureCard.mouseTrackCategory
      }
      encounterId={
        encounterId || state.observationBloodPressureCard.encounterId
      }
      onClick={handleCardClick}
      selectedCard={_.get(state, 'patientSummaryCards.selectedCard')}
      isSelectable={isSelectable}
    />
  )
}

const ObservationBloodPressureCard: React.FunctionComponent<{
  patientId: string
  encounterId?: string
  onClick?: any
  isSelectable?: boolean
  selectedCard?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  patientId,
  encounterId,
  onClick,
  isSelectable = true,
  selectedCard,
  mouseTrackCategory = 'observaion_blood_pressure_card',
  mouseTrackLabel = 'observaion_blood_pressure_card',
}) => {
  const params: IObservationListFilterQuery = {
    code: OBSERVATION_CODE.BLOOD_PRESSURE.code,
    encounterId,
    patientId,
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
        <ObservationBloodPressureCardView
          observation={observationList[0]}
          onClick={handleCardClick}
          selectedCard={selectedCard}
          isSelectable={isSelectable}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default ObservationBloodPressureCard

export const ObservationBloodPressureCardView: React.FunctionComponent<{
  observation: any
  onClick?: any
  selectedCard?: string
  isSelectable?: boolean
}> = ({ observation, onClick, selectedCard, isSelectable }) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Blood Pressure'
      Icon={<Icon className={clsx('fas fa-stethoscope', classes.iconCard)} />}
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
        <Grid
          xs={12}
          item
          container
          direction='column'
          className={clsx(
            isSelectable ? [classes.clickable, classes.hover] : null,
            selectedCard === OBSERVATION_CODE.BLOOD_PRESSURE.value
              ? classes.selectedCard
              : null,
          )}
          onClick={() =>
            onClick
              ? onClick(
                  OBSERVATION_CODE.BLOOD_PRESSURE.value,
                  OBSERVATION_CODE.BLOOD_PRESSURE.code,
                )
              : null
          }
        >
          <Typography
            component='div'
            variant='body2'
            className={classes.bodyCard}
            style={{
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Typography variant='body2' className={classes.topicTitle}>
              SYS
            </Typography>
            <div>
              <Typography
                component='span'
                variant='h5'
                className={classes.contentText}
              >
                {find(
                  get(observation, 'valueModal'),
                  (value) => value.code === 'Systolic Blood Pressure',
                )
                  ? Number(
                      find(
                        get(observation, 'valueModal'),
                        (value) => value.code === 'Systolic Blood Pressure',
                      ).value,
                    ).toFixed(2)
                  : 'N/A'}
              </Typography>{' '}
              <Typography
                component='span'
                variant='body1'
                className={classes.unitText}
              >
                {get(observation, 'unit') || ''}
              </Typography>
            </div>
          </Typography>
          <Divider variant='middle' />
          <Typography
            component='div'
            variant='body2'
            className={classes.bodyCard}
            style={{
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Typography variant='body2' className={classes.topicTitle}>
              DAI
            </Typography>
            <div>
              <Typography
                component='span'
                variant='h5'
                className={classes.contentText}
              >
                {find(
                  get(observation, 'valueModal'),
                  (value) => value.code === 'Diastolic Blood Pressure',
                )
                  ? Number(
                      find(
                        get(observation, 'valueModal'),
                        (value) => value.code === 'Diastolic Blood Pressure',
                      ).value,
                    ).toFixed(2)
                  : 'N/A'}
              </Typography>{' '}
              <Typography
                component='span'
                variant='body1'
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
        <Typography variant='body2'>{get(observation, 'issued')}</Typography>
      </Grid>
    </CardLayout>
  )
}
