import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientImmunizationTable from '@components/widget/patient/PatientImmunizationTable'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientImmunizationView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['patient', 'immunization']}>
      <>
        <CssBaseline />
        <PatientImmunizationTable
          patientId={get(query, 'patientId')}
          max={get(query, 'max')}
          isInitialize={get(query, 'isInitialize') || true}
          initialFilter={get(query, 'initialFilter')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientImmunizationView.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default PatientImmunizationView
