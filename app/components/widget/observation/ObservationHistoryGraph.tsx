import * as React from 'react'

import { OBSERVATION_CODE } from '@config/observation'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'
import ObservationBloodPressureGraph from './ObservationBloodPressureGraph'
import ObservationBodyHeightGraph from './ObservationBodyHeightGraph'
import ObservationBodyMassIndexGraph from './ObservationBodyMassIndexGraph'
import ObservationBodyTemperatureGraph from './ObservationBodyTemperatureGraph'
import ObservationBodyWeightGraph from './ObservationBodyWeightGraph'
import ObservationHeartRateGraph from './ObservationHeartRateGraph'

const useStyles = makeStyles(theme => ({
  virtalSignCard: {
    height: '100%',
    // overflow: 'auto',
  },
}))

export const ObservationHistoryGraphWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.observationHistoryGraph)
  return (
    <ObservationHistoryGraph query={state.query} patientId={state.patientId} />
  )
}

const ObservationHistoryGraph: React.FunctionComponent<{
  query: any
  patientId: string
  selectedCard?: string
}> = ({ query, patientId, selectedCard = '' }) => {
  const [Component, setComponent] = React.useState<any>(<EmptyComponent />)
  const classes = useStyles()
  const patientSummaryCardsState = useSelector(
    (state: any) => state.patientSummaryCards,
  )

  React.useEffect(() => {
    setComponent(
      renderGraph(
        _.get(patientSummaryCardsState, 'selectedCard') || selectedCard,
      ),
    )
  }, [query, patientSummaryCardsState])

  const renderGraph = (selected: string) => {
    switch (selected) {
      case OBSERVATION_CODE.BODY_WEIGHT.value:
        return <ObservationBodyWeightGraph patientId={patientId} />
      case OBSERVATION_CODE.BODY_HEIGHT.value:
        return <ObservationBodyHeightGraph patientId={patientId} />
      case OBSERVATION_CODE.BODY_MASS_INDEX.value:
        return <ObservationBodyMassIndexGraph patientId={patientId} />
      case OBSERVATION_CODE.BLOOD_PRESSURE.value:
        return <ObservationBloodPressureGraph patientId={patientId} />
      case OBSERVATION_CODE.BODY_TEMPERATURE.value:
        return <ObservationBodyTemperatureGraph patientId={patientId} />
      case OBSERVATION_CODE.HEART_RATE.value:
        return <ObservationHeartRateGraph patientId={patientId} />
      default:
        return <EmptyComponent />
    }
  }
  return <Paper className={classes.virtalSignCard}>{Component}</Paper>
}

export default ObservationHistoryGraph

const EmptyComponent: React.FunctionComponent<any> = () => {
  const classes = useStyles()
  return (
    <Paper
      className={classes.virtalSignCard}
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography>Empty</Typography>
    </Paper>
  )
}
