import IValidator from '../../IValidator'

import * as _ from 'lodash'
import * as moment from 'moment'

class SFHIREncounterV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'encounter'
    )
  }

  parse(encounter: any): any {
    const type = _.chain(_.get(encounter, 'type'))
      .map(type => type.text)
      .join(', ')
      .value()

    const classCode = _.get(encounter, 'class.code')
    const reason = _.chain(_.get(encounter, 'reason'))
      .map(reason => _.get(reason, 'coding[0].display'))
      .join(', ')
      .value()

    const status = _.get(encounter, 'status')

    const startTime = _.get(encounter, 'period.start')
      ? moment.default(_.get(encounter, 'period.start')).toDate()
      : null

    const endTime = _.get(encounter, 'period.end')
      ? moment.default(_.get(encounter, 'period.end')).toDate()
      : null

    const organizationId = _.chain(encounter)
      .get('reference')
      .split('/')
      .get(1)
      .value()

    return {
      classCode,
      endDateTime: endTime,
      endTime,
      id: _.get(encounter, 'id'),
      organizationId,
      reason,
      startDateTime: startTime,
      startTime,
      status,
      type
    }
  }
}

export default SFHIREncounterV1Validator
