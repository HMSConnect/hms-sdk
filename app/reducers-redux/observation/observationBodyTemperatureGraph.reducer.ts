type ObservationBodyTemperatureGraphType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_BODY_TEMPERATURE_GRAPH'

interface IObservationBodyTemperatureGraphAction {
  type: ObservationBodyTemperatureGraphType
  payload: any
}

export interface IObservationBodyTemperatureGraphStructure {
  dateTimeField: boolean
  headerIconField: boolean
  summaryField: boolean
  valueField: boolean
}

export const initialObservationBodyTemperatureGraphStructure: IObservationBodyTemperatureGraphStructure = {
  dateTimeField: true,
  headerIconField: true,
  summaryField: true,
  valueField: true,
}
export const observationBodyTemperatureGraphInitialState: any = {
  structure: initialObservationBodyTemperatureGraphStructure,
}
const observationBodyTemperatureGraph = (
  state = observationBodyTemperatureGraphInitialState,
  action: IObservationBodyTemperatureGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationBodyTemperatureGraph,
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

export default observationBodyTemperatureGraph
