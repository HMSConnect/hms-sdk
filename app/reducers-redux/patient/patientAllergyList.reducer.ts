type PatientAlleryListListType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC'

interface IPatientAlleryListListAction {
  type: PatientAlleryListListType
  payload: any
}

export const initialState: any = {
  structure: {},
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
