import IValidator from '@validators/IValidator'
import * as _ from 'lodash'

class HMSPractitionerV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType === 'Practitioner'
    )
  }

  parse(practitioner: any): any {
    return {
      name: [{ given: [_.get(_.last(practitioner.name), 'text')] }],
      displayName: _.get(_.last(practitioner.name), 'text'),
      employeeId: _.get(practitioner, 'employeeId'),
      active: _.get(practitioner, 'active'),
      gender: _.get(practitioner, 'gender'),
      birthDate: _.get(practitioner, 'birthDate'),
      qualification: _.chain(practitioner.qualification)
        .map((qualification) => _.get(qualification, 'display'))
        .join(', ')
        .value(),
      telecom: _.chain(practitioner.telecom)
        .map((telecom) => telecom.value)
        .join(', ')
        .value(),
      //   activity: _.get(carePlan, 'activity'),
      //   category: _.chain(carePlan.category)
      //     .map((category) => category.text)
      //     .join(', ')
      //     .value(),
      //   periodStart: _.get(carePlan, 'period.start')
      //     ? moment.default(_.get(carePlan, 'period.start')).toDate()
      //     : null,
      //   periodStartText: _.get(carePlan, 'period.start')
      //     ? moment
      //         .default(_.get(carePlan, 'period.start'))
      //         .format(environment.localFormat.dateTime)
      //     : null,
      //   status: _.get(carePlan, 'status'),
    }
  }
}

export default HMSPractitionerV24XValidator
