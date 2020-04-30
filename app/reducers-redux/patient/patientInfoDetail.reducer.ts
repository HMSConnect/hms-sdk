type PatientInfoDetailType = 'SET_STRUCTURE_PATIENT_INFO_DETAIL'

interface IPatientInfoDetailAction {
  type: PatientInfoDetailType
  payload: any
}

export interface IPatientInfoDetailStructure {}

export const initialPatientInfoDetailStructure: IPatientInfoDetailStructure = {}

const initialState: any = {
  structure: initialPatientInfoDetailStructure,
}
const patientInfoDetail = (
  state = initialState,
  action: IPatientInfoDetailAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_INFO_DETAIL':
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

export default patientInfoDetail
