import environment from '@environment'
import IValidator from '@validators/IValidator'
import { get, last, snakeCase } from 'lodash'
import moment from 'moment'

class HMSAllergyV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      snakeCase(schema.resourceType) === 'allergy'
    )
  }

  parse(data: any): any {
    return {
      assertedDate: get(data, 'onsetDateTime')
        ? moment(get(data, 'onsetDateTime')).toDate()
        : null,
      assertedDateText: get(data, 'onsetDateTime')
        ? moment(get(data, 'onsetDateTime')).format(
            environment.localFormat.dateTime,
          )
        : null,
      category: data.category,
      codeText: data.code,
      criticality: get(last(data.reaction), 'severity'),
      // type: data.type,
    }
  }
}

export default HMSAllergyV24XValidator
