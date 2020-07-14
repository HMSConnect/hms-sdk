import environment from '@environment'
import IValidator from '@validators/IValidator'
import { get, join } from 'lodash'
import moment from 'moment'

class HMSAllergyIntoleranceV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType.toLowerCase() === 'allergy_intolerance'
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
      codeText: data.code.text,
      criticality: data.criticality,
      type: data.type,
    }
  }
}

export default HMSAllergyIntoleranceV24XValidator
