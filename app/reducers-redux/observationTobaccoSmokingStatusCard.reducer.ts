type ObservationTobaccoSmokingStatusCardType = 'INIT_PATIENT_SUMMARY'

interface IObservationTobaccoSmokingStatusCardAction {
  type: ObservationTobaccoSmokingStatusCardType
  payload: any
}

const observationTobaccoSmokingStatusCardInitialState: any = {}
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
    default:
      return state
  }
}

export default observationTobaccoSmokingStatusCard
