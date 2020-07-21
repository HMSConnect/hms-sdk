import IValidator from '@validators/IValidator'
class HMSRadiologyV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'radiology'
    )
  }

  parse(data: any): any {
    return { ...data }
  }
}

export default HMSRadiologyV24XValidator
