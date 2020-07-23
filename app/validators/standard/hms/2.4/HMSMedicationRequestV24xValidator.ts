import IValidator from '@validators/IValidator'
import * as _ from 'lodash'

class HMSMedicationRequestV24xValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      _.snakeCase(schema.resourceType) === 'medication_dispense'
    )
  }

  parse(data: any): any {
    return {
      ...data,
      medicationCodeableConcept: _.get(
        _.last(data.medication),
        'medicineGenericName',
      ),
    }
  }
}

export default HMSMedicationRequestV24xValidator
