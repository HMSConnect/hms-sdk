type PatientEncounterTimelineType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_ENCOUNTER_TIMELINE'

interface IPatientEncounterTimelineAction {
  type: PatientEncounterTimelineType
  payload: any
}

export interface IEncounterTimelistStructure {
  filterIconField: boolean
  headerIconField: boolean
  practitionerField: boolean
  classCodeField: boolean
  diagnosisField: boolean
  typeCureField: boolean
}

export const initialPatientEncounterTimelineStructure: IEncounterTimelistStructure = {
  classCodeField: true,
  diagnosisField: true,
  filterIconField: true,
  headerIconField: true,
  practitionerField: true,
  typeCureField: true,
}

const initialState: any = {
  structure: initialPatientEncounterTimelineStructure,
}
const patientEncounterTimeline = (
  state = initialState,
  action: IPatientEncounterTimelineAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientEncounterTimeline,
      }
    case 'SET_STRUCTURE_PATIENT_ENCOUNTER_TIMELINE':
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

export default patientEncounterTimeline
