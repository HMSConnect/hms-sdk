type ObservationBodyHeightGraphType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_BODY_HEIGHT_GRAPH'

interface IObservationBodyHeightGraphAction {
  type: ObservationBodyHeightGraphType
  payload: any
}

export interface IObservationBodyHeightGraphStructure {
  dateTimeField: boolean
  headerIconField: boolean
  valueField: boolean
}

export const initialObservationBodyHeightGraphStructure: IObservationBodyHeightGraphStructure = {
  dateTimeField: true,
  headerIconField: true,
  valueField: true,
}

export const observationBodyHeightGraphInitialState: any = {
  structure: initialObservationBodyHeightGraphStructure,
}
const observationBodyHeightGraph = (
  state = observationBodyHeightGraphInitialState,
  action: IObservationBodyHeightGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationBodyHeightGraph,
      }
    case 'SET_STRUCTURE_OBSERVATION_BODY_HEIGHT_GRAPH':
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

export default observationBodyHeightGraph
