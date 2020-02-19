type PatientDemographicSummaryCardType = 'UPDATE_SELECTED_CARD'

interface IPatientDemographicSummaryCardAction {
  type: PatientDemographicSummaryCardType
  payload: any
}

const initialState: any = {
  selectedCard: 'BLOOD_PRESSURE',
}
const patientDemographic = (
  state = initialState,
  action: IPatientDemographicSummaryCardAction,
) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_CARD':
      return {
        ...state,
        selectedCard: action.payload.name,
      }
    default:
      return state
  }
}

export default patientDemographic
