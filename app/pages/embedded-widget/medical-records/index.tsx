import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import EncounterInfoDetail from '@components/widget/encounter/EncounterInfoDetail'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const EncounterMedicalRecords: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper
      dependencies={[
        'encounter',
        'diagnostic_report',
        'observation',
        'allergy_intolerance',
      ]}
    >
      <>
        <CssBaseline />
        <EncounterInfoDetail query={query} />
      </>
    </BootstrapWrapper>
  )
}

EncounterMedicalRecords.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default EncounterMedicalRecords
