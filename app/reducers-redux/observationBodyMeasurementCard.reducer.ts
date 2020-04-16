type ObservationBodyMeasurementCardType = 'INIT_PATIENT_SUMMARY'

interface IObservationBodyMeasurementCardAction {
  type: ObservationBodyMeasurementCardType
  payload: any
}

const initialState: any = {}
const observationBodyMeasurementCard = (
  state = initialState,
  action: IObservationBodyMeasurementCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationBodyMeasurementCard,
      }
    default:
      return state
  }
}

export default observationBodyMeasurementCard
