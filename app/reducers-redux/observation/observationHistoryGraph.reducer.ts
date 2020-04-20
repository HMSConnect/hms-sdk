type ObservationHistoryGraphType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_HISTORY_GRAPH'

interface IObservationHistoryGraphAction {
  type: ObservationHistoryGraphType
  payload: any
}

const initialState: any = {
  structure: {},
}
const observationHistoryGraph = (
  state = initialState,
  action: IObservationHistoryGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationHistoryGraph,
      }
    case 'SET_STRUCTURE_OBSERVATION_HISTORY_GRAPH':
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

export default observationHistoryGraph
