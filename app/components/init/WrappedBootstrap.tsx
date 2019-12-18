import React from 'react'

import * as _ from 'lodash'
import widgetDependencies from '../../config/widget_dependencies.json'
import registerServices from './registerServices'
import registerValidators from './registerValidators'

const WrappedBootstrapper: React.FunctionComponent<any> = ({
  dependencies,
  children
}) => {
  React.useEffect(() => {
    dependencies.forEach((depName: string) => {
      const dependency = _.get(widgetDependencies, depName) || {}
      registerServices(dependency.services || [])
      registerValidators(dependency.validators || [])
    })
  }, [])

  return <>{children}</>
}

export default WrappedBootstrapper
