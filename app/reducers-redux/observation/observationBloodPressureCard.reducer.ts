type ObservationBloodPressureCardType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_BLOOD_PRESSURE_CARD'

interface IObservationBloodPressureCardAction {
  type: ObservationBloodPressureCardType
  payload: any
}

export interface IObservationBloodPressureCardStructure {
  headerIconField: boolean
  dateTimeField: boolean
}

export const initialObservationBloodPressureCardStructure: IObservationBloodPressureCardStructure = {
  dateTimeField: true,
  headerIconField: true,
}

export const observationBloodPressureCardInitialState: any = {
  structure: initialObservationBloodPressureCardStructure,
}
const observationBloodPressureCard = (
  state = observationBloodPressureCardInitialState,
  action: IObservationBloodPressureCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationBloodPressureCard,
      }
    case 'SET_STRUCTURE_OBSERVATION_BLOOD_PRESSURE_CARD':
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

export default observationBloodPressureCard
