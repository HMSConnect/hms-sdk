import IValidator from '../../IValidator'
import validatorManager from '../../ValidatorManager'

class SFHIREncounterV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'encounter'
    )
  }

  parse(encounter: any): any {
    return encounter
  }
}

validatorManager.register(new SFHIREncounterV1Validator(), 1)
