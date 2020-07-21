import IValidator from '@validators/IValidator'
import { snakeCase } from 'lodash'
class HMSPiV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      snakeCase(schema.resourceType) === 'present_illness'
    )
  }

  parse(data: any): any {
    return { ...data }
  }
}

export default HMSPiV24XValidator
