type PatientInfoDashboardType = 'SET_STRUCTURE_PATIENT_INFO_DASHBOARD'

interface IPatientInfoDashboardAction {
  type: PatientInfoDashboardType
  payload: any
}

export interface IPatientInfoDashboardStructure {}

export const initialPatientInfoDashboardStructure: IPatientInfoDashboardStructure = {}

const initialState: any = {
  structure: initialPatientInfoDashboardStructure,
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
