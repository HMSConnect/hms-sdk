type PatientDemographicType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC'

interface IPatientDemographicAction {
  type: PatientDemographicType
  payload: any
}

export interface IPatientDemographicStructure {
  addressField: boolean
  ageField: boolean
  dobField: boolean
  emailField: boolean
  genderField: boolean
  iconField: boolean
  languageField: boolean
  nameField: boolean
  phoneField: boolean
}

export const initialPatientDemographicStructure: IPatientDemographicStructure = {
  addressField: true,
  ageField: true,
  dobField: true,
  emailField: true,
  genderField: true,
  iconField: false,
  languageField: true,
  nameField: true,
  phoneField: true,
}

export const patientDemographicInitialState: any = {
  structure: initialPatientDemographicStructure,
}

const patientDemographic = (
  state = patientDemographicInitialState,
  action: IPatientDemographicAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientDemographic,
      }
    case 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC':
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

export default patientDemographic
