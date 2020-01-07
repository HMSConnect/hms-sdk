import environment from '@environment'
import IValidator from '@validators/IValidator'
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
    const valueQuantity = _.get(observation, 'valueQuantity.value')
    return {
      codeText: _.get(observation, 'code.text'),
      display: observation.display,
      issued: _.get(observation, 'issued')
        ? moment
            .default(_.get(observation, 'issued'))
            .format(environment.localFormat.dateTime)
        : '',
      issuedDate: _.get(observation, 'issued')
        ? moment.default(_.get(observation, 'issued')).toDate()
        : null,
      unit: observation.component
        ? _.get(observation, 'component[0].valueQuantity.unit')
        : _.get(observation, 'valueQuantity.unit'),
      value: observation.component
        ? _.chain(observation.component)
            .map((c: any) => c.valueQuantity.value.toFixed(2))
            .join('/')
            .value()
        : _.isNumber(valueQuantity)
        ? Number(valueQuantity).toFixed(2)
        : '',
      valueModal: observation.component
        ? _.chain(observation.component)
            .map((c: any) => ({
              code: c.code.text,
              value: c.valueQuantity.value,
            }))
            .value()
        : _.isNumber(valueQuantity)
        ? Number(valueQuantity).toFixed(6)
        : valueQuantity,
    }
  }
}

export default SFHIRObservationV1Validator
