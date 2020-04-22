type PatientEncounterTimelineType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_ENCOUNTER_TIMELINE'

interface IPatientEncounterTimelineAction {
  type: PatientEncounterTimelineType
  payload: any
}

export interface IEncounterTimelistStructure {
  filterIcon: boolean
  headerIcon: boolean
  practitioner: boolean
  classCode: boolean
  diagnosis: boolean
  typeCure: boolean
}

export const initialPatientEncounterTimelineStructure: IEncounterTimelistStructure = {
  classCode: true,
  diagnosis: true,
  filterIcon: true,
  headerIcon: true,
  practitioner: true,
  typeCure: true,
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
