type PatientConditionTableType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_CONDITION_TABLE'

interface IPatientConditionTableAction {
  type: PatientConditionTableType
  payload: any
}

export interface IPatientConditionTableStructure {}

export const initialPatientConditionTableStructure: IPatientConditionTableStructure = {}

const initialState: any = {
  structure: initialPatientConditionTableStructure,
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
