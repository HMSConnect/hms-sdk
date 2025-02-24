type PatientCarePlanTableType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_CARE_PLAN_TABLE'

interface IPatientCarePlanTableAction {
  type: PatientCarePlanTableType
  payload: any
}

export interface IPatientCarePlanTableStructure {
  filterGroupByField: boolean
  filterIconField: boolean
}

export const initialPatientCarePlanTableStructure: IPatientCarePlanTableStructure = {
  filterGroupByField: true,
  filterIconField: true,
}

const initialState: any = {
  structure: initialPatientCarePlanTableStructure,
}
const patientCarePlanTable = (
  state = initialState,
  action: IPatientCarePlanTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientCarePlanTable,
      }

    case 'SET_STRUCTURE_PATIENT_CARE_PLAN_TABLE':
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

export default patientCarePlanTable
