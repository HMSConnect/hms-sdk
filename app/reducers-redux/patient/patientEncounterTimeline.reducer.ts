type PatientEncounterTimelineType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_ENCOUNTER_TIMELINE'

interface IPatientEncounterTimelineAction {
  type: PatientEncounterTimelineType
  payload: any
}

const initialState: any = {
  structure: {},
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
