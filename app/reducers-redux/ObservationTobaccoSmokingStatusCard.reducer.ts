type ObservationTobaccoSmokingStatusCardType = 'INIT_PATIENT_SUMMARY'

interface IObservationTobaccoSmokingStatusCardAction {
  type: ObservationTobaccoSmokingStatusCardType
  payload: any
}

const initialState: any = {}
const observationTobaccoSmokingStatusCard = (
  state = initialState,
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
