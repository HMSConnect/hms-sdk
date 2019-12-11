import IValidator from '../../IValidator'
import validatorManager from '../../ValidatorManager'

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

validatorManager.register(new SFHIROrganizationV1Validator(), 4)
