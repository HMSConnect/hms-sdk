type PatientSummaryType = 'SET_STRUCTURE_PATIENT_SUMMARY'

interface IPatientSummaryAction {
  type: PatientSummaryType
  payload: any
}

const initialState: any = {
  structure: {},
}
const patientSummary = (
  state = initialState,
  action: IPatientSummaryAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_SUMMARY':
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

export default patientSummary
