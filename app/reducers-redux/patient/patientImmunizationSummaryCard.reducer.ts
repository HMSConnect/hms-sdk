type PatientImmunizationSummaryCardType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_IMMUNIZATION_SUMMARY_CARD'

interface IPatientImmunizationSummaryCardAction {
  type: PatientImmunizationSummaryCardType
  payload: any
}

export interface IPatientImmunizationSummaryCardStructure {}

export const initialPatientImmunizationSummaryCardStructure: IPatientImmunizationSummaryCardStructure = {}

const initialState: any = {
  structure: initialPatientImmunizationSummaryCardStructure,
}
const patientImmunizationSummaryCard = (
  state = initialState,
  action: IPatientImmunizationSummaryCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientImmunizationSummaryCard,
      }
    case 'SET_STRUCTURE_PATIENT_IMMUNIZATION_SUMMARY_CARD':
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

export default patientImmunizationSummaryCard
