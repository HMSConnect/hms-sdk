type PatientConditionTable = 'INIT_PATIENT_SUMMARY' | 'SET_STRUCTURE_PATIENT_CONDITION_TABLE'

interface IPatientConditionTableAction {
  type: PatientConditionTable
  payload: any
}

const initialState: any = {
  structure: {},
}
const patientConditionTable = (
  state = initialState,
  action: IPatientConditionTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientConditionTable,
      }
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

export default patientConditionTable
