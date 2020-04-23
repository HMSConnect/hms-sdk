type PatientMedicationListType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_MEDICATION_LIST'

interface IPatientMedicationListAction {
  type: PatientMedicationListType
  payload: any
}
export interface IPatientMedicationListStructure {
  headerIconField: boolean
}

export const initialPatientMedicationListStructure: IPatientMedicationListStructure = {
  headerIconField: true,
}
const initialState: any = {
  structure: initialPatientMedicationListStructure,
}
const patientMedicationList = (
  state = initialState,
  action: IPatientMedicationListAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientMedicationList,
      }
    case 'SET_STRUCTURE_PATIENT_MEDICATION_LIST':
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

export default patientMedicationList
