import environment from '@environment'
import IValidator from '@validators/IValidator'
import { get, last, snakeCase } from 'lodash'
import moment from 'moment'
import * as _ from 'lodash'

class HMSDiagnosisV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      snakeCase(schema.resourceType) === 'diagnosis'
    )
  }

  parse(data: any): any {
    const codeText = _.get(_.last(data.code), 'display')
    return { ...data, codeText }
  }
}

export default HMSDiagnosisV24XValidator
