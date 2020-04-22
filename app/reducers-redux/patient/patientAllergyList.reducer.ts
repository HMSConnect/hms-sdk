type PatientAlleryListListType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC'

interface IPatientAlleryListListAction {
  type: PatientAlleryListListType
  payload: any
}

export interface IPatientAlleryListListStructure {}

export const initialPatientAllergyListStructure: IPatientAlleryListListStructure = {}

export const initialState: any = {
  structure: initialPatientAllergyListStructure,
}
const patientAllergyList = (
  state = initialState,
  action: IPatientAlleryListListAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientAllergyList,
      }

    case 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC':
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

export default patientAllergyList
