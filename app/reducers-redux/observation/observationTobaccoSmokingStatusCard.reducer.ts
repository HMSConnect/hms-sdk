type ObservationTobaccoSmokingStatusCardType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_TOBACCO_SMOKING_STATUS_CARD'

interface IObservationTobaccoSmokingStatusCardAction {
  type: ObservationTobaccoSmokingStatusCardType
  payload: any
}

const observationTobaccoSmokingStatusCardInitialState: any = {
  structure: {},
}
const observationTobaccoSmokingStatusCard = (
  state = observationTobaccoSmokingStatusCardInitialState,
  action: IObservationTobaccoSmokingStatusCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationTobaccoSmokingStatusCard,
      }
    case 'SET_STRUCTURE_OBSERVATION_TOBACCO_SMOKING_STATUS_CARD':
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

export default observationTobaccoSmokingStatusCard
