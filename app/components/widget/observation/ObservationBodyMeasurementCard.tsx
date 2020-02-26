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
  Tooltip,
  Typography,
} from '@material-ui/core'
import { lighten } from '@material-ui/core/styles'
import { sendMessage } from '@utils'
import clsx from 'clsx'
import * as _ from 'lodash'
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

export const ObservationBodyMeasurementCardWithConnector: React.FunctionComponent = () => {
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
    <ObservationBodyMeasurementCard
      key={`ObservationBodyMeasurementCard${_.get(state, 'encounterId')}`}
      patientId={state.patientId}
      encounterId={state.encounterId}
      onClick={handleCardClick}
      selectedCard={_.get(state, 'selectedCard')}
    />
  )
}

const ObservationBodyMeasurementCard: React.FunctionComponent<{
  patientId: string
  encounterId?: string
  onClick?: any
  selectedCard?: any
}> = ({ patientId, encounterId, onClick, selectedCard }) => {
  let params: IObservationListFilterQuery = {}
  params = {
    codes: `${OBSERVATION_CODE.BODY_HEIGHT.code},${OBSERVATION_CODE.BODY_WEIGHT.code},${OBSERVATION_CODE.BODY_MASS_INDEX.code}`,
    encounterId,
    patientId,
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
  return (
    <ObservationBodyMeasurementCardView
      observations={observationList}
      onClick={onClick}
      selectedCard={selectedCard}
    />
  )
}

export default ObservationBodyMeasurementCard

const ObservationBodyMeasurementCardView: React.FunctionComponent<{
  observations: any
  onClick?: any
  selectedCard?: any
}> = ({ observations, onClick, selectedCard }) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Body Measurement'
      Icon={<Icon className={'fas fa-male'} style={{ color: '#00b0ff' }} />}
      option={{
        style: {
          backgroundColor: lighten('#00b0ff', 0.85),
          color: '#00b0ff',
        },
      }}
    >
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: '100%' }}
      >
        <Grid xs={12} item container direction='column'>
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
              className={clsx(
                classes.bodyCard,
                classes.clickable,
                classes.hover,
                selectedCard === OBSERVATION_CODE.BODY_HEIGHT.value
                  ? classes.selectedCard
                  : null,
              )}
              style={{
                paddingLeft: 16,
                paddingRight: 16,
              }}
              onClick={() =>
                onClick ? onClick(OBSERVATION_CODE.BODY_HEIGHT.value) : null
              }
            >
              <Typography variant='body2' className={classes.topicTitle}>
                Height
              </Typography>
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
                <Typography
                  component='span'
                  variant='body1'
                  className={classes.unitText}
                >
                  {_.find(observations, {
                    code: OBSERVATION_CODE.BODY_HEIGHT.code,
                  })
                    ? _.find(observations, {
                        code: OBSERVATION_CODE.BODY_HEIGHT.code,
                      }).unit
                    : ''}
                </Typography>
              </div>
            </Typography>
          </Tooltip>
          <Divider variant='middle' />
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
              className={clsx(
                classes.bodyCard,
                classes.clickable,
                classes.hover,
                selectedCard === OBSERVATION_CODE.BODY_WEIGHT.value
                  ? classes.selectedCard
                  : null,
              )}
              style={{
                paddingLeft: 16,
                paddingRight: 16,
              }}
              onClick={() =>
                onClick ? onClick(OBSERVATION_CODE.BODY_WEIGHT.value) : null
              }
            >
              <Typography variant='body2' className={classes.topicTitle}>
                Weight
              </Typography>
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
                <Typography
                  component='span'
                  variant='body1'
                  className={classes.unitText}
                >
                  {_.find(observations, {
                    code: OBSERVATION_CODE.BODY_WEIGHT.code,
                  })
                    ? _.find(observations, {
                        code: OBSERVATION_CODE.BODY_WEIGHT.code,
                      }).unit
                    : ''}
                </Typography>
              </div>
            </Typography>
          </Tooltip>
          <Divider variant='middle' />
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
              className={clsx(
                classes.bodyCard,
                classes.clickable,
                classes.hover,
                selectedCard === OBSERVATION_CODE.BODY_MASS_INDEX.value
                  ? classes.selectedCard
                  : null,
              )}
              style={{
                paddingLeft: 16,
                paddingRight: 16,
              }}
              onClick={() =>
                onClick ? onClick(OBSERVATION_CODE.BODY_MASS_INDEX.value) : null
              }
            >
              <Typography variant='body2' className={classes.topicTitle}>
                BMI
                {/* <InfoIcon className={classes.infoIcon} /> */}
              </Typography>
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
                <Typography
                  component='span'
                  variant='body1'
                  className={classes.unitText}
                >
                  {_.find(observations, {
                    code: OBSERVATION_CODE.BODY_MASS_INDEX.code,
                  })
                    ? _.find(observations, {
                        code: OBSERVATION_CODE.BODY_MASS_INDEX.code,
                      }).unit
                    : ''}
                </Typography>
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
        <Typography variant='body2'>
          {observations
            ? _.get(_.maxBy(observations, 'issuedDate'), 'issued')
            : ''}
        </Typography>
      </Grid>
    </CardLayout>
  )
}
