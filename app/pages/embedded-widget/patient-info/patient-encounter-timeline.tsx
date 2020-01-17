import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientEncounterTimeline from '@components/widget/patient/PatientEncounterTimeline'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientEncounterTimelineView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'encounter']}>
      <>
        <CssBaseline />
        <PatientEncounterTimeline
          patientId={get(query, 'patientId')}
          max={get(query, 'max')}
          isInitialize={get(query, 'isInitialize') || true}
          initialFilter={get(query, 'initialFilter')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientEncounterTimelineView.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default PatientEncounterTimelineView
