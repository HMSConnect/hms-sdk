type PatientClaimTableType = 'SET_STRUCTURE_PATIENT_CONDITION_TABLE'

interface IPatientClaimTableAction {
  type: PatientClaimTableType
  payload: any
}

const initialState: any = {
  structure: {},
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
