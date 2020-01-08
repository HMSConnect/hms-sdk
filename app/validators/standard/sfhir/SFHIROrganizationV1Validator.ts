import IValidator from '@validators/IValidator'

class SFHIROrganizationV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'patient'
    )
  }

  parse(organization: any) {
    return organization
  }
}

export default SFHIROrganizationV1Validator
