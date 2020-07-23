import IValidator from '@validators/IValidator'
import { snakeCase } from 'lodash'
class HMSCcV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      snakeCase(schema.resourceType) === 'chief_complaint'
    )
  }

  parse(data: any): any {
    return { ...data }
  }
}

export default HMSCcV24XValidator
