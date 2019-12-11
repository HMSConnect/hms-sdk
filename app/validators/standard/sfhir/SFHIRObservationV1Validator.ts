import IValidator from '../../IValidator'
import validatorManager from '../../ValidatorManager'

import * as _ from 'lodash'
import * as moment from 'moment'
class SFHIRObservationV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'observation'
    )
  }

  parse(observation: any): any {
    return {
      display: observation.display,
      unit: observation.component
        ? observation.component[0].valueQuantity.unit
        : observation.valueQuantity.unit,
      value: observation.component
        ? observation.component
            .map((c: any) => c.valueQuantity.value.toFixed(2))
            .join('/')
        : observation.valueQuantity.value.toFixed(2)
    }
  }
}

validatorManager.register(new SFHIRObservationV1Validator(), 5)
