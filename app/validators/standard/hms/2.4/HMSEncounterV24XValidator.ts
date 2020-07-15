import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'

class HMSEncounterV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'encounter'
    )
  }

  parse(encounter: any): any {
    const organizationData = {
      display: _.get(encounter, 'organization.codeName'),
    }

    const participant = _.get(encounter, 'participant')
  
    const reason = _.get(encounter, 'reason')

    const startTime = _.get(encounter, 'period')
      ? moment.default(_.last(_.get(encounter, 'period.start'))).toDate()
      : null

    const endTime = _.get(encounter, 'period')
      ? moment.default(_.last(_.get(encounter, 'period.end'))).toDate()
      : null

    // TODO diagnose and participant
    return {
      participant,
      id: _.get(encounter, 'en'),
      type: reason,
      endDateTime: endTime,
      endTime,
      organization: organizationData,
      startDateTime: startTime,
      startTime,
    }
  }
}

export default HMSEncounterV24XValidator
