type PatientObservationTableType = 'SET_STRUCTURE_PATIENT_OBSERVATION_TABLE'

interface IPatientObservationTableAction {
  type: PatientObservationTableType
  payload: any
}

const initialState: any = {
  structure: {},
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
