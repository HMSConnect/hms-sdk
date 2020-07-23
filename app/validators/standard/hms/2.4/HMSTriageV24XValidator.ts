import IValidator from '@validators/IValidator'
class HMSTriageV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'triage'
    )
  }

  parse(data: any): any {
    return { ...data }
  }
}

export default HMSTriageV24XValidator
