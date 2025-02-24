type ObservationBloodPressureGraphType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_BLOOD_PRESSURE_GRAPH'

interface IObservationBloodPressureGraphAction {
  type: ObservationBloodPressureGraphType
  payload: any
}

export interface IObservationBloodPressureGraphStructure {
  dateTimeField: boolean
  headerIconField: boolean
  valueField: boolean
}

export const initialObservationBloodPressureGraphStructure: IObservationBloodPressureGraphStructure = {
  dateTimeField: true,
  headerIconField: true,
  valueField: true,
}

export const observationBloodPressureGraphInitialState: any = {
  structure: initialObservationBloodPressureGraphStructure,
}
const observationBloodPressureGraph = (
  state = observationBloodPressureGraphInitialState,
  action: IObservationBloodPressureGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationBloodPressureGraph,
      }
    case 'SET_STRUCTURE_OBSERVATION_BLOOD_PRESSURE_GRAPH':
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

export default observationBloodPressureGraph
