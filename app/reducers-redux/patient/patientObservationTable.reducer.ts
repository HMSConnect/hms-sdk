type PatientObservationTableType = 'SET_STRUCTURE_PATIENT_OBSERVATION_TABLE'

interface IPatientObservationTableAction {
  type: PatientObservationTableType
  payload: any
}

export interface IPatientMedicationSummaryCardStructure {}

export const initialPatientObservationTableStructure: IPatientMedicationSummaryCardStructure = {}

const initialState: any = {
  structure: initialPatientObservationTableStructure,
}
const patientObservationTable = (
  state = initialState,
  action: IPatientObservationTableAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_OBSERVATION_TABLE':
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

export default patientObservationTable
