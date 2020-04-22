type PatientImmunizationTableType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_IMMUNIZATION_TABLE'

interface IPatientImmunizationTableAction {
  type: PatientImmunizationTableType
  payload: any
}

export interface IPatientImmunizationTableStructure {}

export const initialPatientImmunizationTableStructure: IPatientImmunizationTableStructure = {}
const initialState: any = {
  structure: initialPatientImmunizationTableStructure,
}
const patientImmunizationTable = (
  state = initialState,
  action: IPatientImmunizationTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientImmunizationTable,
      }
    case 'SET_STRUCTURE_PATIENT_IMMUNIZATION_TABLE':
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

export default patientImmunizationTable
