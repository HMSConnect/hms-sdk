import IValidator from '@validators/IValidator'
class SFHIRAllergyIntoleranceV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'allergy_intolerance'
    )
  }

  parse(data: any): any {
    return data
  }
}

export default SFHIRAllergyIntoleranceV1Validator
