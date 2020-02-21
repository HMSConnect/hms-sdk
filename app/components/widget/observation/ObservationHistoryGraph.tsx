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
import ObservationHeartbeatGraph from './ObservationHeartbeatGraph'

const useStyles = makeStyles(theme => ({
  virtalSignCard: {
    height: '100%',
    // overflow: 'auto',
  },
}))

export const ObservationHistoryGraphWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.observationHistoryGraph)
  return <ObservaionHistoryGraph query={state.query} />
}

const ObservaionHistoryGraph: React.FunctionComponent<{
  query: any
}> = ({ query }) => {
  const [Component, setComponent] = React.useState<any>(<EmptyComponent />)
  const classes = useStyles()
  const patientSummaryCardsState = useSelector(
    (state: any) => state.patientSummaryCards,
  )

  React.useEffect(() => {
    setComponent(
      renderGraph(
        _.get(patientSummaryCardsState, 'selectedCard') ||
          _.get(query, 'selectedCard'),
      ),
    )
  }, [query, patientSummaryCardsState])

  const renderGraph = (selected: string) => {
    switch (selected) {
      case OBSERVATION_CODE.BODY_WEIGHT.value:
        return <ObservationBodyWeightGraph query={query} />
      case OBSERVATION_CODE.BODY_HEIGHT.value:
        return <ObservationBodyHeightGraph query={query} />
      case OBSERVATION_CODE.BODY_MASS_INDEX.value:
        return <ObservationBodyMassIndexGraph query={query} />
      case OBSERVATION_CODE.BLOOD_PRESSURE.value:
        return <ObservationBloodPressureGraph query={query} />
      case OBSERVATION_CODE.BODY_TEMPERATURE.value:
        return <ObservationBodyTemperatureGraph query={query} />
      case OBSERVATION_CODE.HEARTBEAT.value:
        return <ObservationHeartbeatGraph query={query} />
      default:
        return <EmptyComponent />
    }
  }
  return <Paper className={classes.virtalSignCard}>{Component}</Paper>
}

export default ObservaionHistoryGraph

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
