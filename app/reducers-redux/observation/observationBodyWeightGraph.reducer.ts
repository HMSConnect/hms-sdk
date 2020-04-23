type ObservationBodyWeightGraphType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_BODY_TEMPERATURE_GRAPH'

interface IObservationBodyWeightGraphAction {
  type: ObservationBodyWeightGraphType
  payload: any
}

export interface IObservationBodyWeightGraphStructure {
  dateTimeField: boolean
  headerIconField: boolean
  summaryField: boolean
}

export const initialObservationBodyWeightGraphStructure: IObservationBodyWeightGraphStructure = {
  dateTimeField: true,
  headerIconField: true,
  summaryField: true,
}
export const observationBodyWeightGraphInitialState: any = {
  structure: initialObservationBodyWeightGraphStructure,
}
const observationBodyWeightGraph = (
  state = observationBodyWeightGraphInitialState,
  action: IObservationBodyWeightGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationBodyWeightGraph,
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

export default observationBodyWeightGraph
