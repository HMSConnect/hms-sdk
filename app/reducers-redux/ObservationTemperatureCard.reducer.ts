type ObservationTemperatureCardType = 'INIT_PATIENT_SUMMARY'

interface IObservationTemperatureCardAction {
  type: ObservationTemperatureCardType
  payload: any
}

const initialState: any = {}
const observationTemperatureCard = (
  state = initialState,
  action: IObservationTemperatureCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationTemperatureCard,
      }
    default:
      return state
  }
}

export default observationTemperatureCard
