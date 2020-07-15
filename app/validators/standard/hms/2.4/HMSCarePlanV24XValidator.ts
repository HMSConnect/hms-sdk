import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'

class HMSCarePlanV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType === 'care_plan'
    )
  }

  parse(carePlan: any): any {
    console.log('carePlan')

    return {
    //   activity: _.get(carePlan, 'activity'),
    //   category: _.chain(carePlan.category)
    //     .map((category) => category.text)
    //     .join(', ')
    //     .value(),
    //   periodStart: _.get(carePlan, 'period.start')
    //     ? moment.default(_.get(carePlan, 'period.start')).toDate()
    //     : null,
    //   periodStartText: _.get(carePlan, 'period.start')
    //     ? moment
    //         .default(_.get(carePlan, 'period.start'))
    //         .format(environment.localFormat.dateTime)
    //     : null,
    //   status: _.get(carePlan, 'status'),
    }
  }
}

export default HMSCarePlanV24XValidator
