import widgetDependencies from '@config/widget_dependencies.json'
import BootstrapHelper from '@init/BootstrapHelper'
import get from 'lodash/get'
import * as React from 'react'

type DependencyType =
  | 'patient'
  | 'encounter'
  | 'diagnostic_report'
  | 'observation'
  | 'allergy_intolerance'
  | 'claim'
  | 'condition'
  | 'imaging_study'
  | 'immunization'
  | 'procedure'
  | 'medication_request'
  | 'care_plan'
  | 'organization'

const BootstrapWrapper: React.FunctionComponent<{
  dependencies: DependencyType[]
  children: React.ReactElement
}> = ({ dependencies, children }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    for (const depName of dependencies) {
      const dependency = get(widgetDependencies, depName) || {}
      BootstrapHelper.registerServices(dependency.services || [])
      BootstrapHelper.registerValidators(dependency.validators || [])
    }

    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>loading dependencies...</div>
  }
  return <>{children}</>
}

export default BootstrapWrapper
