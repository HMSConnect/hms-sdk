import React from 'react'

import { Grid } from '@material-ui/core'

import useEncounter from '../../hooks/useEncounter'
import EncounterInfoDetailSide from './EncounterInfoDetailSide'
import EncounterInfoDetailSub from './EncounterInfoDetailSub'

const EncounterInfoDetail: React.FunctionComponent<any> = ({ query }) => {
  const { data: encounter, isLoading } = useEncounter(query.encounterId)

  if (isLoading) {
    return <div> encounter loading</div>
  }
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Grid container justify='center' spacing={2}>
          <Grid item>
            <EncounterInfoDetailSide encounter={encounter} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <EncounterInfoDetailSub encounter={encounter} />
      </Grid>
    </Grid>
  )
}

export default EncounterInfoDetail
