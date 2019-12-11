import IValidator from '../../IValidator'
import validatorManager from '../../ValidatorManager'

import * as _ from 'lodash'
import * as moment from 'moment'
import environment from '../../../config'

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
      .map(reason => reason.coding[0].display)
      .join(', ')
      .value()

    const status = _.get(encounter, 'status')

    const startTime = _.get(encounter, 'period.start')
      ? moment.default(_.get(encounter, 'period.start')).toDate()
      : 'Unknow'

    const endTime = _.get(encounter, 'period.end')
      ? moment.default(_.get(encounter, 'period.end')).toDate()
      : 'Unknow'

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

validatorManager.register(new SFHIREncounterV1Validator(), 1)
