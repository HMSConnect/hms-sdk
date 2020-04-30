type PatientProcedureTable =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_PROCEDURE_TABLE'

interface IPatientProcedureTableAction {
  type: PatientProcedureTable
  payload: any
}

export interface IPatientProcedureTableStructure {
  filterIconField: boolean
  headerIconField: boolean
}

export const initialPatientProcedureTableStructure: IPatientProcedureTableStructure = {
  filterIconField: true,
  headerIconField: true,
}

const initialState: any = {
  structure: initialPatientProcedureTableStructure,
}
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
