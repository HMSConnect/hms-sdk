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
      <BootstrapWrapper
        dependencies={[
          'patient',
          'care_plan',
          'allergy_intolerance',
          'condition',
          'claim',
        ]}
      >
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
        id: '0debf275-d585-4897-a8eb-25726def1ed5',
      })
      .then((result) => {
        setData(result)
      })
  }, [])
  return <div>{JSON.stringify(data, null, 2)}</div>
}

export default withAuthSync(Playground)
