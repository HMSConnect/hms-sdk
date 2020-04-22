type ObservationSummaryGraphType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_SUMMARY_GRAPH'

interface IObservationSummaryGraphAction {
  type: ObservationSummaryGraphType
  payload: any
}

export interface IObservationSummaryGraphStructure {}

export const initialObservationSummaryGraphStructure: IObservationSummaryGraphStructure = {}
const initialState: any = {
  structure: initialObservationSummaryGraphStructure,
}
const observationSummaryGraph = (
  state = initialState,
  action: IObservationSummaryGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationSummaryGraph,
      }
    case 'SET_STRUCTURE_OBSERVATION_SUMMARY_GRAPH':
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

export default observationSummaryGraph
