type PatientClaimTableType = 'SET_STRUCTURE_PATIENT_CONDITION_TABLE'

interface IPatientClaimTableAction {
  type: PatientClaimTableType
  payload: any
}

export interface IPatientClaimTableStructure {}

export const initialPatientClaimTableStructure: IPatientClaimTableStructure = {}

const initialState: any = {
  structure: initialPatientClaimTableStructure,
}
const patientClaimTable = (
  state = initialState,
  action: IPatientClaimTableAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_CONDITION_TABLE':
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

export default patientClaimTable
