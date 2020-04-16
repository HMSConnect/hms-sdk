type ObservationBloodPressureCardType = 'INIT_PATIENT_SUMMARY'

interface IObservationBloodPressureCardAction {
  type: ObservationBloodPressureCardType
  payload: any
}

export const observationBloodPressureCardInitialState: any = {}
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
    default:
      return state
  }
}

export default observationBloodPressureCard
