import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'

class HMSConditionV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType === 'condition'
    )
  }

  parse(data: any): any {
    console.log("test new condition");
    console.log(data);
    
    return {
      test:"ok"
      // clinicalStatus: _.get(data, 'clinicalStatus') || '',
      // codeText: _.get(data, 'code.text'),
      // onset: _.get(data, 'onsetDateTime')
      //   ? moment
      //       .default(_.get(data, 'onsetDateTime'))
      //       .format(environment.localFormat.dateTime)
      //   : null,
      // onsetDateTime: _.get(data, 'onsetDateTime')
      //   ? moment.default(_.get(data, 'onsetDateTime')).toDate()
      //   : null,
      // verificationStatus: _.get(data, 'verificationStatus') || '',
    }
  }
}

export default HMSConditionV24XValidator
