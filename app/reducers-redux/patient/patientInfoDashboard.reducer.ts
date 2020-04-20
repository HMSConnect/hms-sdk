type PatientInfoDashboardType = 'SET_STRUCTURE_PATIENT_INFO_DASHBOARD'

interface IPatientInfoDashboardAction {
  type: PatientInfoDashboardType
  payload: any
}

const initialState: any = {
  structure: {},
}
const patientInfoDashboard = (
  state = initialState,
  action: IPatientInfoDashboardAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_INFO_DASHBOARD':
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

export default patientInfoDashboard
