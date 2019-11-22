import IValidator from './IValidator'

export interface ISchema {
  version: number
  standard: 'SFHIR' | 'HMS_CONNECT'
  resourceType: string
}

interface IValidatorRegistry {
  priority: number
  validator: IValidator
}

class ValidatorManager {
  instances: IValidatorRegistry[] = []

  register(clazz: any, priority: number) {
    console.info('registering validator..', clazz)
    this.instances.push({ priority, validator: clazz })
  }

  compile(schema: ISchema): IValidator | null {
    const availableValidators = this.instances.filter(instance => {
      return instance.validator.isValid(schema)
    })
    const sortedAvailableValidators = availableValidators.sort((a, b) => {
      return a.priority > b.priority ? 1 : -1
    })
    return sortedAvailableValidators.length > 0
      ? sortedAvailableValidators[0].validator
      : null
  }
}

export default new ValidatorManager()
