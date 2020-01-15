// useAllergyIntoleranceList({})

import useObservationList from '@components/hooks/useObservationList'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import * as React from 'react'

export default function Playground() {
  return (
    <BootstrapWrapper dependencies={['allergy_intolerance', 'observation']}>
      <div>
        <List />
      </div>
    </BootstrapWrapper>
  )
}

function List() {
  const date = new Date('2020-01-01')
  const { data } = useObservationList({
    filter: {
      categoryCode: 'vital-signs',
      encounterId: '65787ab8-63e4-4927-9a6c-66c51a10c97c',
      issued_lt: date.toISOString(),
      patientId: 'ddf5ae5c-5646-4a76-9efd-f7e697f3b728',
    },
  })

  return <div>{JSON.stringify(data)}</div>
  // return <div></div>
}
