type PatientAllergyIntoleranceTableType = 'SET_STRUCTURE_PATIENT_ALLERGY_INTOLERANCE_TABLE'

interface IPatientAllergyIntoleranceTableAction {
  type: PatientAllergyIntoleranceTableType
  payload: any
}
export interface IPatientAllergyIntoleranceTableStrucutre {
  filterIconField: boolean
}

export const initialPatientAllergyIntoleranceTableStructure: IPatientAllergyIntoleranceTableStrucutre = {
  filterIconField: true
}

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
