type ObservationBodyMassIndexGraphType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_BODY_MASS_INDEX_GRAPH'

interface IObservationBodyMassIndexGraphAction {
  type: ObservationBodyMassIndexGraphType
  payload: any
}

export interface IObservationBodyMassIndexGraphStructure {
  dateTimeField: boolean
  headerIconField: boolean
  summaryField: boolean
}

export const initialObservationBodyMassIndexGraphStructure: IObservationBodyMassIndexGraphStructure = {
  dateTimeField: true,
  headerIconField: true,
  summaryField: true,
}

export const observationBodyMassIndexGraphInitialState: any = {
  structure: initialObservationBodyMassIndexGraphStructure,
}
const observationBodyMassIndexGraph = (
  state = observationBodyMassIndexGraphInitialState,
  action: IObservationBodyMassIndexGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationBodyMassIndexGraph,
      }
    case 'SET_STRUCTURE_OBSERVATION_BODY_MASS_INDEX_GRAPH':
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

export default observationBodyMassIndexGraph
