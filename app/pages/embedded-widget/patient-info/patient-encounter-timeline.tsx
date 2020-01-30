import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientEncounterTimeline from '@components/widget/patient/PatientEncounterTimeline'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientEncounterTimelineView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'encounter', 'organization']}>
      <>
        <CssBaseline />
        <PatientEncounterTimeline
          patientId={get(query, 'patientId')}
          selectedEncounterId={get(query, 'encounterId')}
          max={get(query, 'max')}
          isInitialize={get(query, 'isInitialize') || true}
          initialFilter={get(query, 'initialFilter')}
          isContainer={false}
          isRouteable={get(query, 'isRouteable')}
          name={get(query, 'name')}
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
