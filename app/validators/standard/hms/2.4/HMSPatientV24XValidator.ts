import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import get from 'lodash/get'
import last from 'lodash/last'
import map from 'lodash/map'
class HMSPatientV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'patient'
    )
  }

  parse(patient: any): any {
    const identifier: any = {
      id: _.findLast(patient.identifier, { type: 'MRN' }),
      mr: _.findLast(patient.identifier, { type: 'NID' }),
    }
    const age = patient
      ? patient.birthDate
        ? patient.deceasedDateTime
          ? patient.deceasedDateTime.split('-')[0] -
            patient.birthDate.split('-')[0]
          : new Date().getFullYear() - patient.birthDate.split('-')[0]
        : 'Unknown'
      : 'Unknown'
    const communication = map(patient.communication, (com) =>
      get(com, 'language'),
    )
    const name = {
      family: get(last(patient.name), 'familyName'),
      given: [get(last(patient.name), 'givenName')],
      text: get(last(patient.name), 'text'),
    }
    const prefix = get(last(patient.name), 'prefix')
    const address = get(last(patient.address), 'text')

    const compileStandard = {
      address,
      age,
      birthDate: patient.birthDate,
      communication,
      deceasedDateTime: patient.deceasedDateTime,
      email: patient.email, // no data
      gender: patient.gender,
      id: get(patient, 'hn'),
      identifier,
      name,
      prefix,
      telecom: patient.telecom,
    }
    return compileStandard
  }
}

export default HMSPatientV24XValidator
