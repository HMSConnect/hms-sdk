import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import moment from 'moment'

class HMSProcedureV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'procedure'
    )
  }

  parse(data: any): any {
    console.log(data)

    return {
      // patientId:data.hn,
      // detail:"kopai",
      // ...data
      code: _.get(_.last(data.code), 'code'),
      date: _.get(data, 'performedStartDateTime'),
      detail: _.get(_.last(data.code), 'display'),
      performedPeriodStart: _.get(data, 'performedPeriod.start')
        ? moment(_.get(data, 'performedPeriod.start')).toDate()
        : null,
      performedPeriodStartText: _.get(data, 'performedPeriod.start')
        ? moment(_.get(data, 'performedPeriod.start')).format(
            environment.localFormat.dateTime,
          )
        : null,
      status: data.criticality,
    }
  }
}

export default HMSProcedureV24XValidator
