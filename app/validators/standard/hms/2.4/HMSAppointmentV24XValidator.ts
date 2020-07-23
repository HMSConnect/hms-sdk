import IValidator from '@validators/IValidator'

class HMSAppointmentV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'appointment'
    )
  }

  parse(data: any): any {
    return { ...data }
  }
}

export default HMSAppointmentV24XValidator
