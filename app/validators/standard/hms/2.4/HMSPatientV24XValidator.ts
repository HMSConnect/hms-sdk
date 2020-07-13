import IValidator from '@validators/IValidator'
import get from 'lodash/get'
import map from 'lodash/map'
import last from 'lodash/last'
import split from 'lodash/split'

class HMSPatientV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'patient'
    )
  }

  parse(patient: any): any {
    // console.log("//////given///////");
    // console.log(patient);

    const age = patient
      ? patient.birthDate
        ? patient.deceasedDateTime
          ? patient.deceasedDateTime.split('-')[0] -
            patient.birthDate.split('-')[0]
          : new Date().getFullYear() - patient.birthDate.split('-')[0]
        : 'Unknown'
      : 'Unknown'
    const identifier: any = {}
    const communication = map(patient.communication, (com) =>
      get(com, 'language'),
    )
    const name = get(last(patient.name), 'text')
    const prefix = get(last(patient.name), 'prefix')
    const address = get(last(patient.address), 'text')

    const compileStandard = {
      name: name,
      prefix: prefix,
      age,
      gender: patient.gender,
      address: address,
      birthDate: patient.birthDate,
      communication,
      deceasedDateTime: patient.deceasedDateTime,
      email: patient.email, // no data
      identifier,
      telecom: patient.telecom,
    }
    return compileStandard
  }
}

export default HMSPatientV24XValidator
