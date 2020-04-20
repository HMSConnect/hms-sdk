type ObservationBodyMeasurementCardType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_BODY_MEASUREMENT_CARD'

interface IObservationBodyMeasurementCardAction {
  type: ObservationBodyMeasurementCardType
  payload: any
}

export const observationBodyMeasurementCardInitialState: any = {
  structure: {},
}
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
    case 'SET_STRUCTURE_OBSERVATION_BODY_MEASUREMENT_CARD':
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

export default observationBodyMeasurementCard
