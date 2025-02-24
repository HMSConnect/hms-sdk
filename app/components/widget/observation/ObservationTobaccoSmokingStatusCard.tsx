import React from 'react'

import {
  initialObservationTobaccoSmokingStatusCardStructure,
  IObservationTobaccoSmokingStatusCardStructure,
} from '@app/reducers-redux/observation/observationTobaccoSmokingStatusCard.reducer'
import CardLayout from '@components/base/CardLayout'
import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import { Grid, Icon, makeStyles, Theme, Typography } from '@material-ui/core'
import { sendMessage } from '@utils'
import clsx from 'clsx'
import get from 'lodash/get'
import { useSelector } from 'react-redux'

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
        ? theme.palette?.septenary?.dark
        : theme.palette?.septenary?.light,
    color: theme.palette.septenary?.main || '',
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
        ? theme.palette?.septenary?.main
        : theme.palette?.septenary?.dark,
  },
  infoIcon: {
    color: '#1976d2',
    zoom: 0.7,
  },
  selectedCard: {
    backgroundColor: theme.palette.action.selected,
    border: '2px solid #00b0ff',
    borderRadius: 4,
  },
  unitText: {
    fontWeight: 'normal',
  },
}))

export const ObservationTobaccoSmokingStatusCardWithConnector: React.FunctionComponent<{
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
    observationTobaccoSmokingStatusCard:
      state.observationTobaccoSmokingStatusCard,
    patientSummaryCards: state.patientSummaryCards,
  }))
  return (
    <ObservationTobaccoSmokingStatusCard
      key={`ObservationBloodPressureCard${
        encounterId ||
        get(state, 'observationTobaccoSmokingStatusCard.encounterId')
      }`}
      patientId={
        patientId || state?.observationTobaccoSmokingStatusCard?.patientId
      }
      encounterId={
        encounterId || state?.observationTobaccoSmokingStatusCard?.encounterId
      }
      mouseTrackCategory={
        mouseTrackCategory ||
        state?.observationTobaccoSmokingStatusCard?.mouseTrackCategory
      }
      selectedCard={get(state, 'patientSummaryCards.selectedCard')}
      isSelectable={isSelectable}
      structure={state?.observationTobaccoSmokingStatusCard?.structure}
    />
  )
}

const ObservationTobaccoSmokingStatusCard: React.FunctionComponent<{
  patientId: string
  encounterId: string
  structure?: IObservationTobaccoSmokingStatusCardStructure
  onClick?: any
  selectedCard?: any
  mouseTrackCategory?: string
  mouseTrackLabel?: string
  isSelectable?: boolean
}> = ({
  patientId,
  encounterId,
  structure = initialObservationTobaccoSmokingStatusCardStructure,
  onClick,
  mouseTrackCategory = 'observaion_tobacco_smoking_status_card',
  mouseTrackLabel = 'observaion_tobacco_smoking_status_card',
  isSelectable = true,
  selectedCard,
}) => {
  const params: IObservationListFilterQuery = {
    code: OBSERVATION_CODE.TABACO_SMOKING_STATUS.code,
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
        <ObservationTabacoSmokingStatusCardView
          observation={observationList[0]}
          onClick={handleCardClick}
          isSelectable={isSelectable}
          selectedCard={selectedCard}
          structure={structure}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default ObservationTobaccoSmokingStatusCard

const ObservationTabacoSmokingStatusCardView: React.FunctionComponent<{
  observation: any
  structure: IObservationTobaccoSmokingStatusCardStructure
  onClick?: any
  selectedCard?: any
  isSelectable?: boolean
}> = ({ observation, structure, onClick, selectedCard, isSelectable }) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Tobacco Smoking Status'
      Icon={
        structure.headerIconField ? (
          <Icon className={clsx('fas fa-smoking', classes.iconCard)} />
        ) : null
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
              selectedCard === OBSERVATION_CODE.TABACO_SMOKING_STATUS.value
                ? classes.selectedCard
                : null,
            )}
            onClick={() =>
              onClick
                ? onClick(
                    OBSERVATION_CODE.TABACO_SMOKING_STATUS.value,
                    OBSERVATION_CODE.TABACO_SMOKING_STATUS.code,
                  )
                : null
            }
          >
            <div>
              <Typography
                component='span'
                variant='h6'
                className={classes.contentText}
                style={{
                  color: get(observation, 'value') ? undefined : 'gray',
                  paddingRight: 8,
                }}
              >
                {get(observation, 'value') || 'N/A'}
              </Typography>{' '}
              {/* <Typography
                component='span'
                variant='h4'
                className={classes.unitText}
              >
                {get(observation, 'unit') || ''}
              </Typography> */}
            </div>
          </Typography>
        </Grid>
      </Grid>
      {structure.dateTimeField ? (
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
      ) : null}
    </CardLayout>
  )
}
