import * as _ from 'lodash'
import * as moment from 'moment'
import environment from '../../../config'
import IValidator from '../../IValidator'
import ValidatorManager from '../../ValidatorManager'

class SFHIRDiagnosticReportV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'diagnostic_report'
    )
  }

  parse(data: any): any {
    // specific observations
    const observationSchema = _.get(data, 'result[0].schema')
    if (observationSchema) {
      const observationValidator = ValidatorManager.compile(observationSchema)
      if (observationValidator) {
        data.result = _.map(data.result, it => {
          return observationValidator.parse(it)
        })
      }
    }
    return {
      codeText: _.get(data, 'code.text'),
      issued: _.get(data, 'issued')
        ? moment
            .default(_.get(data, 'issued'))
            .format(environment.localFormat.dateTime)
        : '',
      issuedDate: _.get(data, 'issued')
        ? moment.default(_.get(data, 'issued'))
        : null,
      result: _.get(data, 'result')
    }
  }
}

ValidatorManager.register(
  'SFHIR_DIAGNOSTIC_REPORT_V1',
  new SFHIRDiagnosticReportV1Validator(),
  1
)
