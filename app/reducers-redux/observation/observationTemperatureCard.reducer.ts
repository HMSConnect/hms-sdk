type ObservationTemperatureCardType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_TEMPERATURE_CARD'

interface IObservationTemperatureCardAction {
  type: ObservationTemperatureCardType
  payload: any
}

export const observationTemperatureCardInitialState: any = {
  structure: {},
}
const observationTemperatureCard = (
  state = observationTemperatureCardInitialState,
  action: IObservationTemperatureCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationTemperatureCard,
      }
    case 'SET_STRUCTURE_OBSERVATION_TEMPERATURE_CARD':
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

export default observationTemperatureCard
