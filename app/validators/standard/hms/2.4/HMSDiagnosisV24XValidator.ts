import environment from '@environment'
import IValidator from '@validators/IValidator'
import { get, last, snakeCase } from 'lodash'
import moment from 'moment'

class HMSDiagnosisV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      snakeCase(schema.resourceType) === 'diagnosis'
    )
  }

  parse(data: any): any {
    return data
  }
}

export default HMSDiagnosisV24XValidator
