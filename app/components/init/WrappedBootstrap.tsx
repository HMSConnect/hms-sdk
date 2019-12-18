import React from 'react'

import * as _ from 'lodash'
import { serviceConfig, validatorConfig } from '../../config'
import widgetDependencies from '../../config/widget_dependencies.json'
import { HMSService } from '../../services/HMSServiceFactory'
import ValidatorManager from '../../validators/ValidatorManager'

const WrappedBootstrapper: React.FunctionComponent<{
  dependencies: string[]
  children: React.ReactElement
}> = ({ dependencies, children }) => {
  React.useEffect(() => {
    dependencies.forEach((depName: string) => {
      const dependency = _.get(widgetDependencies, depName) || {}
      registerServices(dependency.services || [])
      registerValidators(dependency.validators || [])
    })

    function registerServices(services: string[]) {
      services.forEach(serviceName => {
        if (!HMSService.isExist(serviceName)) {
          const Service = _.get(serviceConfig, `${serviceName}.clazz`)
          if (Service) {
            HMSService.register(serviceName, Service)
          } else {
            throw new Error(`can't get service name ${serviceName}.`)
          }
        }
      })
    }

    function registerValidators(validators: string[]) {
      validators.forEach(validatorName => {
        if (!ValidatorManager.isExist(validatorName)) {
          const validator = _.get(validatorConfig, validatorName)

          if (validator) {
            const ValidatorClazz = validator.clazz

            ValidatorManager.register(
              validatorName,
              new ValidatorClazz(),
              validator.priority
            )
          } else {
            throw new Error(`can't get validator name ${validatorName}.`)
          }
        }
      })
    }
  }, [])

  return <>{children}</>
}

export default WrappedBootstrapper
