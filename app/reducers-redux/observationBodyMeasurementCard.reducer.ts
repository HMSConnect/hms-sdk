type ObservationBodyMeasurementCardType = 'INIT_PATIENT_SUMMARY'

interface IObservationBodyMeasurementCardAction {
  type: ObservationBodyMeasurementCardType
  payload: any
}

export const observationBodyMeasurementCardInitialState: any = {}
const observationBodyMeasurementCard = (
  state = observationBodyMeasurementCardInitialState,
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
