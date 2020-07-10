import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import AbstractService from '@services/AbstractService'
import { HMSService } from '@services/HMSServiceFactory'
import * as React from 'react'
/**
 * This is playground zone, you can try to implement to this component.
 * and goto `/playground` to play.
 */

function Playground() {
  return (
    <div>
      <h1>Example Playground</h1>
      <BootstrapWrapper dependencies={['patient']}>
        <div>
          <List />
        </div>
      </BootstrapWrapper>
    </div>
  )
}

function List() {
  const [data, setData] = React.useState({})
  React.useEffect(() => {
    const patientService = HMSService.getService('patient') as AbstractService
    patientService
      .list({
        hn:
          'YzhEdWyHNbggHrfZpowcQ3-ndSs8gsQXMdkr2HNSFMYAJ-Zhzd7SkM8VtPGLwtrARSqFeM5tJkuPWA2pwYMxvtTMr5',
      })
      .then((result) => {
        setData(result)
      })
  }, [])
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default withAuthSync(Playground)
