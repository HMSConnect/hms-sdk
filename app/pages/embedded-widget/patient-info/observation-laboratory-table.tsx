import BootstrapWrapper from '@components/init/BootstrapWrapper'
import ObservationLaboratoryTable from '@components/widget/observation/ObservationLaboratoryTable'
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
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <ObservationLaboratoryTable
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
