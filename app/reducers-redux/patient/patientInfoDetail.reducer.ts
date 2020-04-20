type PatientInfoDetailType = 'SET_STRUCTURE_PATIENT_INFO_DETAIL'

interface IPatientInfoDetailAction {
  type: PatientInfoDetailType
  payload: any
}

const initialState: any = {
  structure: {},
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
