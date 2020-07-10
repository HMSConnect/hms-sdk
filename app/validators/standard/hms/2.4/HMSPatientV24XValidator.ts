import IValidator from '@validators/IValidator'
import get from 'lodash/get'
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
    // console.log(patient)

    const age = patient
      ? patient.birthDate
        ? patient.deceasedDateTime
          ? patient.deceasedDateTime.split('-')[0] -
            patient.birthDate.split('-')[0]
          : new Date().getFullYear() - patient.birthDate.split('-')[0]
        : 'Unknown'
      : 'Unknown'
    const identifier: any = {}

    // identifier['id'] = { systemCode: 'ID', value: patient.id }
    // patient.identifier.map((o: any, oIndex: number) => {
    //   if (
    //     o.hasOwnProperty('type') &&
    //     o.type.hasOwnProperty('coding') &&
    //     Array.isArray(o.type.coding) &&
    //     o.type.coding.length > 0
    //   ) {
    //     if (o.value) {
    //       identifier[o.type.coding[0].code.toLowerCase()] = {
    //         systemCode: o.type.coding[0].code,
    //         value: o.value ? o.value : 'Unknown',
    //       }
    //     }
    //   } else {
    //     const code = o.system.split('/').pop()
    //     identifier[code] = {
    //       systemCode: code,
    //       value: o.value,
    //     }
    //   }
    // })

    const communication = map(patient.communication, (com) =>
      get(com, 'language.text'),
    )

    const compileStandard = {
      name: patient.name.text,
      prefix: patient.name.prefix,
      age,
      gender: patient.gender,
      address: [patient.address],
      birthDate: patient.birthDate,
      communication,
      deceasedDateTime: patient.deceasedDateTime,
      email: patient.email,
      identifier,
      telecom: patient.telecom,
    }
    return compileStandard
  }
}

export default HMSPatientV24XValidator
