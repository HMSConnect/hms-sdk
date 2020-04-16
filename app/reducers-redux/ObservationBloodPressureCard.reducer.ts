type ObservationBloodPressureCardType = 'INIT_PATIENT_SUMMARY'

interface IObservationBloodPressureCardAction {
  type: ObservationBloodPressureCardType
  payload: any
}

const initialState: any = {}
const observationBloodPressureCard = (
  state = initialState,
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
