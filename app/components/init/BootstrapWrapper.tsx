import LoadingSection from '@components/base/LoadingSection'
import widgetClassicDependencies from '@config/widget_classic_dependencies.json'
import widgetDependencies from '@config/widget_dependencies.json'
import BootstrapHelper from '@init/BootstrapHelper'
import get from 'lodash/get'
import * as React from 'react'

export type DependencyType =
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
  | 'practitioner'

export type DependencyMode = 'sfhir' | 'classic'

const BootstrapWrapper: React.FunctionComponent<{
  dependencies: DependencyType[]
  mode?: DependencyMode
  children: React.ReactElement
}> = ({ dependencies, mode = 'sfhir', children }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    console.info('mode=', mode)
    for (const dependencyName of dependencies) {
      const dependency =
        mode === 'sfhir'
          ? get(widgetDependencies, dependencyName)
          : get(widgetClassicDependencies, dependencyName) || {}
      BootstrapHelper.registerServices(
        dependency.services || [],
        dependencyName,
      )
      BootstrapHelper.registerValidators(dependency.validators || [])
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <LoadingSection label='loading dependencies...' />
  }
  return <>{children}</>
}

export default BootstrapWrapper
