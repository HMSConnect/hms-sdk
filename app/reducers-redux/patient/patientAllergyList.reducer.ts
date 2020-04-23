type PatientAlleryListListType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_ALLERGY_LIST'

interface IPatientAlleryListListAction {
  type: PatientAlleryListListType
  payload: any
}

export interface IPatientAlleryListListStructure {
  headerIconField: boolean
}

export const initialPatientAllergyListStructure: IPatientAlleryListListStructure = {
  headerIconField: true,
}

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

    case 'SET_STRUCTURE_PATIENT_ALLERGY_LIST':
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
