type PatientAllergySummaryCardType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_ALLERGY_SUMMARY_CARD'

interface IPatientAllergySummaryCardAction {
  type: PatientAllergySummaryCardType
  payload: any
}

const initialState: any = {
  structure: {},
}
const patientAllergySummaryCard = (
  state = initialState,
  action: IPatientAllergySummaryCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientAllergySummaryCard,
      }
    case 'SET_STRUCTURE_PATIENT_ALLERGY_SUMMARY_CARD':
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

export default patientAllergySummaryCard
