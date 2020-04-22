type PatientPractitionerListType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_PRACTITIONER'

interface IPatientPractitionerListAction {
  type: PatientPractitionerListType
  payload: any
}

export interface IPatientPractitionerListStructure {}

export const initialPatientPractitionerStructure: IPatientPractitionerListStructure = {}

export const initialState: any = {
  structure: initialPatientPractitionerStructure,
}
const patientPractitioner = (
  state = initialState,
  action: IPatientPractitionerListAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientPractitioner,
      }
    case 'SET_STRUCTURE_PATIENT_PRACTITIONER':
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

export default patientPractitioner
