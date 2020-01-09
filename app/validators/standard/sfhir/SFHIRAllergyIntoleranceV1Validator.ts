import environment from '@environment'
import IValidator from '@validators/IValidator'
import { get, join } from 'lodash'
import moment from 'moment'

class SFHIRAllergyIntoleranceV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'allergy_intolerance'
    )
  }

  parse(data: any): any {
    return {
      assertedDate: get(data, 'assertedDate')
        ? moment(get(data, 'assertedDate')).toDate()
        : null,
      assertedDateText: get(data, 'assertedDate')
        ? moment(get(data, 'assertedDate')).format(
            environment.localFormat.dateTime,
          )
        : null,
      category: join(data.category, ', '),
      criticality: data.criticality,
      display: data.code.text,
      type: data.type,
    }
  }
}

export default SFHIRAllergyIntoleranceV1Validator
