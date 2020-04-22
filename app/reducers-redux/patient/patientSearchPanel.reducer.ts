type PatientSearchPanelType = 'SET_STRUCTURE_PATIENT_SEARCH_PANEL'

interface IPatientSearchPanelAction {
  type: PatientSearchPanelType
  payload: any
}

export interface IPatientSearchPanelStructure {}

export const initialPatientSearchPanelStructure: IPatientSearchPanelStructure = {}

const initialState: any = {
  structure: initialPatientSearchPanelStructure,
}
const patientSearchPanel = (
  state = initialState,
  action: IPatientSearchPanelAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_SEARCH_PANEL':
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
