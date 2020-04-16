type ObservationHeartRateCardType = 'INIT_PATIENT_SUMMARY'

interface IObservationHeartRateCardAction {
  type: ObservationHeartRateCardType
  payload: any
}

export const observationHeartRateCardInitialState: any = {}
const observationHeartRateCard = (
  state = observationHeartRateCardInitialState,
  action: IObservationHeartRateCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationHeartRateCard,
      }
    default:
      return state
  }
}

export default observationHeartRateCard
