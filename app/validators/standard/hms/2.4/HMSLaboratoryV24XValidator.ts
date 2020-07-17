import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import moment from 'moment'

class HMSLaboratoryV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'laboratory'
    )
  }

  parse(data: any): any {

    return data
  }
}

export default HMSLaboratoryV24XValidator
