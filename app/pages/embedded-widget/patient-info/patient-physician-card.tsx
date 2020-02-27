import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientMedicationRequestTable from '@components/widget/patient/PatientMedicationRequestTable'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'
// import PatientPhysician from '@components/widget/patient/PatientPhysician'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientPhysicianCardWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'medication_request']}>
      <>
        <CssBaseline />
        {/* <PatientPhysician /> */}
      </>
    </BootstrapWrapper>
  )
}

PatientPhysicianCardWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientPhysicianCardWidget)
