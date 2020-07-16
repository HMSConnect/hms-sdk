import { serviceConfig, validatorConfig } from '@config'
import { HMSService } from '@services/HMSServiceFactory'
import ValidatorManager from '@validators/ValidatorManager'
import * as _ from 'lodash'

class BootstrapHelper {
  registerServices(services: string[], depName?: string) {
    for (const serviceName of services) {
      if (!HMSService.isExist(serviceName)) {
        const Service = _.get(serviceConfig, `${serviceName}.clazz`)
        const resource = _.get(serviceConfig, `${serviceName}.resource`)
        if (Service) {
          if (serviceName.startsWith('$')) {
            // $ = default class config
            /**
             * example
             * $ALLERGY_INTOLERANCE => allergy_intolerance
             */
            const name = _.chain(serviceName)
              .replace('$', '')
              .snakeCase()
              .value()

            HMSService.register(depName || name, Service, resource || name)
          } else {
            throw new Error(`not support service name ${serviceName}`)
            // TODO: maybe support create class from object
          }
        } else {
          throw new Error(`can't get service name ${serviceName}.`)
        }
      }
    }
  }

  registerValidators(validators: string[]) {
    for (const validatorName of validators) {
      if (!ValidatorManager.isExist(validatorName)) {
        const validator = _.get(validatorConfig, validatorName)

        if (validator) {
          const ValidatorClazz = validator.clazz
          if (validatorName.startsWith('$')) {
            // $ = default class config
            /**
             * example
             * $SFHIR_ALLERGY_INTOLERANCE_V1 => SFHIR_ALLERGY_INTOLERANCE_V1
             */
            ValidatorManager.register(
              _.chain(validatorName).replace('$', '').value(),
              new ValidatorClazz(),
              validator.priority,
            )
          } else {
            throw new Error(`not support validator name ${validatorName}`)
            // TODO: maybe support create class from object
          }
        } else {
          throw new Error(`can't get validator name ${validatorName}.`)
        }
      }
    }
  }
}

export default new BootstrapHelper()
