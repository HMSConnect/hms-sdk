type PatientImagingStudyTable = 'SET_STRUCTURE_PATIENT_CONDITION_TABLE'

interface IPatientImagingStudyTableAction {
  type: PatientImagingStudyTable
  payload: any
}

const initialState: any = {
  structure: {},
}
const patientImagingStudyTable = (
  state = initialState,
  action: IPatientImagingStudyTableAction,
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

export default patientImagingStudyTable
