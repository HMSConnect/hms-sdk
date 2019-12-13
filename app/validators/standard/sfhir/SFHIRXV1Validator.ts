import IValidator from '../../IValidator'
import validatorManager from '../../ValidatorManager'

import * as _ from 'lodash'
class SFHIRXV1Validator implements IValidator {
  // For Mock
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIRX' &&
      schema.version === 1.0
    )
  }

  parse(x: any): any {
    return x
  }
}

validatorManager.register(new SFHIRXV1Validator(), 1)
