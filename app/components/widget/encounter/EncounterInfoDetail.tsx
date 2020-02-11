import * as React from 'react'

import LoadingSection from '@components/base/LoadingSection'
import useEncounter from '@components/hooks/useEncounter'
import { Grid } from '@material-ui/core'
import EncounterInfoDetailSide from './EncounterInfoDetailSide'
import EncounterInfoDetailSub from './EncounterInfoDetailSub'

const EncounterInfoDetail: React.FunctionComponent<any> = ({ query }) => {
  const { data: encounter, isLoading } = useEncounter(query.encounterId)

  if (isLoading) {
    return <LoadingSection />
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
        <EncounterInfoDetailSub
          encounter={encounter}
          defaultDimention={query.dimention}
        />
      </Grid>
    </Grid>
  )
}

export default EncounterInfoDetail
