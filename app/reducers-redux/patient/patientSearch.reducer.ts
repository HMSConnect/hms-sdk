type PatientSearchType = 'SET_STRUCTURE_PATIENT_SEARCH'

interface IPatientSearchAction {
  type: PatientSearchType
  payload: any
}

export interface IPatientSearchStructure {}

export const initialPatientSearchStructure: IPatientSearchStructure = {}

const initialState: any = {
  structure: initialPatientSearchStructure,
}
const patientSearch = (state = initialState, action: IPatientSearchAction) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_SEARCH':
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

export default patientSearch
