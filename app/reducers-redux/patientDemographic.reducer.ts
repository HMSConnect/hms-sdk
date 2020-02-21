import { OBSERVATION_CODE } from '@config/observation'

type PatientDemographicType = 'INIT_PATIENT_SUMMARY'

interface IPatientDemographicAction {
  type: PatientDemographicType
  payload: any
}

const initialState: any = {}
const patientDemographic = (
  state = initialState,
  action: IPatientDemographicAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientDemographic,
      }
    default:
      return state
  }
}

export default patientDemographic
