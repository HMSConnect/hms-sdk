import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'

class HMSVitalSignV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'vital sign'
    )
  }

  parse(data: any): any {
    // console.log('data :>> ', data)

    return {
      display: _.get(data, 'name'),
      status: _.get(data, 'status'),
      issued: _.get(data, 'issued')
        ? moment
            .default(_.get(data, 'issued'))
            .format(environment.localFormat.dateTime)
        : '',
      issuedDate: _.get(data, 'issued')
        ? moment.default(_.get(data, 'issued')).toDate()
        : null,
      unit: _.get(data, 'unit'),
      value: _.get(data, 'value'),
      valueModal: data.component
        ? _.chain(data.component)
            .map((c: any) => ({
              code: c.name,
              value: c.value,
            }))
            .value()
        : [
            {
              code: data.name,
              value: data.value,
            },
          ],
    }
  }
}

export default HMSVitalSignV24XValidator
