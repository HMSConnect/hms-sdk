type ObservationHeartRateGraphType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_BODY_TEMPERATURE_GRAPH'

interface IObservationHeartRateGraphAction {
  type: ObservationHeartRateGraphType
  payload: any
}

export interface IObservationHeartRateGraphStructure {}

export const initialObservationHeartRateGraphStructure: IObservationHeartRateGraphStructure = {}
export const observationHeartRateGraphInitialState: any = {
  structure: {},
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
    case 'SET_STRUCTURE_OBSERVATION_BODY_TEMPERATURE_GRAPH':
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
