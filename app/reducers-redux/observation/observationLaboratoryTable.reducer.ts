type ObservationLaboratoryTableType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_LABORATORY_TABLE'

interface IObservationLaboratoryTableAction {
  type: ObservationLaboratoryTableType
  payload: any
}

export interface IObservationLaboratoryTableStructure {}

export const initialObservationLaboratoryTableStructure: IObservationLaboratoryTableStructure = {}
export const initialState: any = {
  structure: initialObservationLaboratoryTableStructure,
}
const observationLaboratoryTable = (
  state = initialState,
  action: IObservationLaboratoryTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationLaboratoryTable,
      }
    case 'SET_STRUCTURE_OBSERVATION_LABORATORY_TABLE':
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

export default observationLaboratoryTable
