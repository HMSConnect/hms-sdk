import IValidator from '@validators/IValidator'
import * as _ from 'lodash'

class HMSMedicationRequestV24xValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') 
      // &&
      // schema.resourceType === ''
    )
  }

  parse(data: any): any {
    console.log(data);
    return {
      ...data,
      medicationCodeableConcept: _.get(_.last(data.medication),'medicineGenericName')
    }
  }
}

export default HMSMedicationRequestV24xValidator
