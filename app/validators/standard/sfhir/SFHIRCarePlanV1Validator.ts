import IValidator from '../../IValidator'

class SFHIRCarePlanV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'care_plan'
    )
  }

  parse(carePlan: any): any {
    return carePlan
  }
}

export default SFHIRCarePlanV1Validator
