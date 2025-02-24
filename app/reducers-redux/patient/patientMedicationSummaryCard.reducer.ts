type PatientMedicationSummaryCard =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_MEDICATION_SUMMARY_CARD'

interface IPatientMedicationSummaryCardAction {
  type: PatientMedicationSummaryCard
  payload: any
}
export interface IPatientMedicationSummaryCardStructure {}

export const initialPatientMedicationSummaryCardStructure: IPatientMedicationSummaryCardStructure = {}

const initialState: any = {
  structure: initialPatientMedicationSummaryCardStructure,
}
const patientMedicationSummaryCard = (
  state = initialState,
  action: IPatientMedicationSummaryCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientMedicationSummaryCard,
      }
    case 'SET_STRUCTURE_PATIENT_MEDICATION_SUMMARY_CARD':
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

export default patientMedicationSummaryCard
