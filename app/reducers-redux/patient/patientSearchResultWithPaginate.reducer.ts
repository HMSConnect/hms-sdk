type PatientSearchResultWithPaginateType = 'SET_STRUCTURE_PATIENT_SEARCH_RESULT_WITH_PAGINATE'

interface IPatientSearchResultWithPaginateAction {
  type: PatientSearchResultWithPaginateType
  payload: any
}

const initialState: any = {
  structure: {},
}
const patientSearchResultWithPaginate = (
  state = initialState,
  action: IPatientSearchResultWithPaginateAction,
) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_SEARCH_RESULT_WITH_PAGINATE':
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

export default patientSearchResultWithPaginate
