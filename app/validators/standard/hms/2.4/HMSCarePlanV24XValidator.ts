import IValidator from '@validators/IValidator'

class HMSCarePlanV24XValidator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'HMS' &&
      schema.version.startsWith('2.4') &&
      schema.resourceType === null
    )
  }

  parse(carePlan: any): any {
    return {
      ...carePlan,
      activity: carePlan.activityDetailTextTreatment,
      category: null,
      periodStartText: carePlan.periodStartPlanOfTreatment,
      status: carePlan.statusPlanOfTreatment,
    }
  }
}

export default HMSCarePlanV24XValidator
