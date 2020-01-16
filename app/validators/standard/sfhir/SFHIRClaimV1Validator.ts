import IValidator from '@validators/IValidator'

class SFHIRClaimV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'claim'
    )
  }

  parse(claim: any): any {
    return claim
  }
}

export default SFHIRClaimV1Validator
