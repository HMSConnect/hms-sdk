type PatientImagingStudyTableType = 'SET_STRUCTURE_PATIENT_CONDITION_TABLE'

interface IPatientImagingStudyTableAction {
  type: PatientImagingStudyTableType
  payload: any
}

export interface IPatientImagingStudyTableStructure {}

export const initialPatientImagingStudyTableStructure: IPatientImagingStudyTableStructure = {}

const initialState: any = {
  structure: initialPatientImagingStudyTableStructure,
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
