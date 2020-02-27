import * as React from 'react'

import { cardClick } from '@app/actions/patientsummaryCards.action'
import CardLayout from '@components/base/CardLayout'
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
  Theme,
  Typography,
} from '@material-ui/core'
import { lighten } from '@material-ui/core/styles'
import { sendMessage } from '@utils'
import clsx from 'clsx'
import _ from 'lodash'
import find from 'lodash/find'
import get from 'lodash/get'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
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
  topicTitle: {
    color: 'grey',
  },
  unitText: {
    fontWeight: 'normal',
  },
}))

export const ObservationBloodPressureCardWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.patientSummaryCards)
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
      key={`ObservationBloodPressureCard${_.get(state, 'encounterId')}`}
      patientId={state.patientId}
      encounterId={state.encounterId}
      onClick={handleCardClick}
      selectedCard={_.get(state, 'selectedCard')}
    />
  )
}

const ObservationBloodPressureCard: React.FunctionComponent<{
  patientId: string
  encounterId?: string
  onClick?: any
  selectedCard?: string
}> = ({ patientId, encounterId, onClick, selectedCard }) => {
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
  return (
    <ObservationBloodPressureCardView
      observation={observationList[0]}
      onClick={onClick}
      selectedCard={selectedCard}
    />
  )
}

export default ObservationBloodPressureCard

export const ObservationBloodPressureCardView: React.FunctionComponent<{
  observation: any
  onClick?: any
  selectedCard?: string
}> = ({ observation, onClick, selectedCard }) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Blood Pressure'
      Icon={
        <Icon style={{ color: '#c62828fa' }} className={'fas fa-stethoscope'} />
      }
      option={{
        isHideIcon: true,
        style: {
          backgroundColor: lighten('#ef5350', 0.85),
          color: '#ef5350',
        },
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
            classes.clickable,
            classes.hover,
            selectedCard === OBSERVATION_CODE.BLOOD_PRESSURE.value
              ? classes.selectedCard
              : null,
          )}
          onClick={() =>
            onClick ? onClick(OBSERVATION_CODE.BLOOD_PRESSURE.value) : null
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
