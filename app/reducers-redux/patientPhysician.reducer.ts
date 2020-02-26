type PatientPhysicianListType = 'INIT_PATIENT_SUMMARY'

interface IPatientPhysicianListAction {
  type: PatientPhysicianListType
  payload: any
}

const initialState: any = {}
const patientPhysician = (
  state = initialState,
  action: IPatientPhysicianListAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientPhysician,
      }
    default:
      return state
  }
}

export default patientPhysician
