import * as React from 'react'

import { OBSERVATION_CODE } from '@config/observation'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'
import ObservationBloodPressureGraph, {
  ObservationBloodPressureGraphWithConnector,
} from './ObservationBloodPressureGraph'
import ObservationBodyHeightGraph, {
  ObservationBodyHeightGraphWithConnector,
} from './ObservationBodyHeightGraph'
import ObservationBodyMassIndexGraph, {
  ObservationBodyMassIndexGraphWithConnector,
} from './ObservationBodyMassIndexGraph'
import ObservationBodyTemperatureGraph, {
  ObservationBodyTemperatureGraphWithConnector,
} from './ObservationBodyTemperatureGraph'
import ObservationBodyWeightGraph, {
  ObservationBodyWeightGraphWithConnector,
} from './ObservationBodyWeightGraph'
import ObservationHeartRateGraph, {
  ObservationHeartRateGraphWithConnector,
} from './ObservationHeartRateGraph'

const useStyles = makeStyles((theme) => ({
  virtalSignCard: {
    height: '100%',
    // overflow: 'auto',
  },
}))

export const ObservationHistoryGraphWithConnector: React.FunctionComponent<{
  patientId?: string
  selectedCard?: string
  mouseTrackCategory?: string
}> = ({ patientId, selectedCard, mouseTrackCategory }) => {
  const state = useSelector((state: any) => ({
    observationHistoryGraph: state.observationHistoryGraph,
    patientSummaryCards: state.patientSummaryCards,
  }))
  return (
    <ObservationHistoryGraph
      patientId={patientId || _.get(state, 'observationHistoryGraph.patientId')}
      selectedCard={
        selectedCard || _.get(state, 'patientSummaryCards.selectedCard')
      }
      mouseTrackCategory={
        mouseTrackCategory ||
        _.get(state, 'patientSummaryCards.mouseTrackCategory')
      }
    />
  )
}

const ObservationHistoryGraph: React.FunctionComponent<{
  patientId: string
  selectedCard?: string
  mouseTrackCategory?: string
}> = ({
  patientId,
  selectedCard = '',
  mouseTrackCategory = 'observation_history_graph',
}) => {
  const [Component, setComponent] = React.useState<any>(<EmptyComponent />)
  const classes = useStyles()

  React.useEffect(() => {
    setComponent(renderGraph(selectedCard))
  }, [selectedCard])

  const renderGraph = (selected: string) => {
    switch (selected) {
      case OBSERVATION_CODE.BODY_WEIGHT.value:
        return (
          <ObservationBodyWeightGraphWithConnector
            patientId={patientId}
            mouseTrackCategory={mouseTrackCategory}
          />
        )
      case OBSERVATION_CODE.BODY_HEIGHT.value:
        return (
          <ObservationBodyHeightGraphWithConnector
            patientId={patientId}
            mouseTrackCategory={mouseTrackCategory}
          />
        )
      case OBSERVATION_CODE.BODY_MASS_INDEX.value:
        return (
          <ObservationBodyMassIndexGraphWithConnector
            patientId={patientId}
            mouseTrackCategory={mouseTrackCategory}
          />
        )
      case OBSERVATION_CODE.BLOOD_PRESSURE.value:
        return (
          <ObservationBloodPressureGraphWithConnector
            patientId={patientId}
            mouseTrackCategory={mouseTrackCategory}
          />
        )
      case OBSERVATION_CODE.BODY_TEMPERATURE.value:
        return (
          <ObservationBodyTemperatureGraphWithConnector
            patientId={patientId}
            mouseTrackCategory={mouseTrackCategory}
          />
        )
      case OBSERVATION_CODE.HEART_RATE.value:
        return (
          <ObservationHeartRateGraphWithConnector
            patientId={patientId}
            mouseTrackCategory={mouseTrackCategory}
          />
        )
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
