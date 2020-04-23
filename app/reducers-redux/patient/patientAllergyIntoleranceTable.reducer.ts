type PatientAllergyIntoleranceTableType = 'SET_STRUCTURE_PATIENT_ALLERGY_INTOLERANCE_TABLE'

interface IPatientAllergyIntoleranceTableAction {
  type: PatientAllergyIntoleranceTableType
  payload: any
}
export interface IPatientAllergyIntoleranceTableStrucutre {}

export const initialPatientAllergyIntoleranceTableStructure: IPatientAllergyIntoleranceTableStrucutre = {}

export const initialState: any = {
  structure: initialPatientAllergyIntoleranceTableStructure,
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
