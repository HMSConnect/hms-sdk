import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'

class HMSLaboratoryV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'laboratory'
    )
  }

  parse(data: any): any {
    return {
      code: _.get(data, 'code'),
      value: _.get(data, 'value'),
      unit: _.get(data, 'unit'),
      codeText: _.get(data, 'name'),
      name: _.get(data, 'name'),
      issued: _.get(data, 'issued')
        ? moment
            .default(_.get(data, 'issued'))
            .format(environment.localFormat.dateTime)
        : '',
      issuedDate: _.get(data, 'issued')
        ? moment.default(_.get(data, 'issued')).toDate()
        : null,
      group: _.get(data, 'group'),
      status: _.get(data, 'status'),
    }
  }
}

export default HMSLaboratoryV24XValidator
