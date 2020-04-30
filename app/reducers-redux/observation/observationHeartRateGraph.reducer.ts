type ObservationHeartRateGraphType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_HEART_RATE_GRAPH'

interface IObservationHeartRateGraphAction {
  type: ObservationHeartRateGraphType
  payload: any
}

export interface IObservationHeartRateGraphStructure {
  dateTimeField: boolean
  headerIconField: boolean
  summaryField: boolean
  valueField: boolean
}

export const initialObservationHeartRateGraphStructure: IObservationHeartRateGraphStructure = {
  dateTimeField: true,
  headerIconField: true,
  summaryField: true,
  valueField: true,
}
export const observationHeartRateGraphInitialState: any = {
  structure: initialObservationHeartRateGraphStructure,
}
const observationHeartRateGraph = (
  state = observationHeartRateGraphInitialState,
  action: IObservationHeartRateGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationHeartRateGraph,
      }
    case 'SET_STRUCTURE_OBSERVATION_HEART_RATE_GRAPH':
      return {
        ...state,
        structure: {
          ...state.structure,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

export default observationHeartRateGraph
