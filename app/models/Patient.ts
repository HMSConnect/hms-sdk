import SFHIRPatient from '../components/standards/smart_fhir/SFHIRPatient'
// TODO update interface Patient Information
interface PatientInfoName {
  use: string
  family: string
  given: string[]
  prefix: string[]
}
interface PatientInfoIdentifierCoding {
  system: string
  code: string
}
interface PatientInfoIdentifierType {
  coding: PatientInfoIdentifierCoding[]
}
interface PatientInfoIdentifier {
  type: PatientInfoIdentifierType
}
export interface PatientInfoList {
  name: PatientInfoName[]
  id: string
  gender: string
  identifier: PatientInfoIdentifier[]
  use: string
  birthDate: string
}

// Patient model
class Patient {
  public static parse(json: any): any {
    // TODO: throws exception if fail
    return SFHIRPatient.compile(json) || {}
  }
}

export default Patient
