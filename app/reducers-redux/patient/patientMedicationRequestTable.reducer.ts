type PatientMedicationRequestTableType = 'SET_STRUCTURE_PATIENT_MEDICATION_REQUEST_TABLE'

interface IPatientMedicationRequestTableAction {
  type: PatientMedicationRequestTableType
  payload: any
}
export interface IPatientMedicationRequestTableStructure {}

export const initialPatientMedicationRequestTableStructure: IPatientMedicationRequestTableStructure = {}

const initialState: any = {
  structure: initialPatientMedicationRequestTableStructure,
}
const patientMedicationRequestTable = (
  state = initialState,
  action: IPatientMedicationRequestTableAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_MEDICATION_REQUEST_TABLE':
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

export default patientMedicationRequestTable
