type PatientSearchPanelType = 'SET_STRUCTURE_PATIENT_CONDITION_TABLE'

interface IPatientSearchPanelAction {
  type: PatientSearchPanelType
  payload: any
}

const initialState: any = {
  structure: {},
}
const patientSearchPanel = (
  state = initialState,
  action: IPatientSearchPanelAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_CONDITION_TABLE':
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

export default patientSearchPanel
