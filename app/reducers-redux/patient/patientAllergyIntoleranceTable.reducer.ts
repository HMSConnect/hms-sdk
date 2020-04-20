type PatientAllergyIntoleranceTableType = 'SET_STRUCTURE_PATIENT_ALLERGY_INTOLERANCE_TABLE'

interface IPatientAllergyIntoleranceTableAction {
  type: PatientAllergyIntoleranceTableType
  payload: any
}

export const initialState: any = {
  structure: {},
}
const patientAllergyIntoleranceTable = (
  state = initialState,
  action: IPatientAllergyIntoleranceTableAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_ALLERGY_INTOLERANCE_TABLE':
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

export default patientAllergyIntoleranceTable
