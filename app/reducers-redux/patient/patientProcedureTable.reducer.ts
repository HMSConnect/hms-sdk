type PatientProcedureTable = 'INIT_PATIENT_SUMMARY' | 'SET_STRUCTURE_PATIENT_PROCEDURE_TABLE'

interface IPatientProcedureTableAction {
  type: PatientProcedureTable
  payload: any
}

const initialState: any = {}
const patientProcedureTable = (
  state = initialState,
  action: IPatientProcedureTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientProcedureTable,
      }
    case 'SET_STRUCTURE_PATIENT_PROCEDURE_TABLE':
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

export default patientProcedureTable
