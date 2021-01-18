import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { PatientClaimTableWithConnector } from '@components/widget/patient/PatientClaimTable'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'
import * as React from 'react'


const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientClaimTableWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['patient', 'claim']}>
      <>
        <CssBaseline />
        <PatientClaimTableWithConnector
          patientId={get(query, 'patientId')}
          max={get(query, 'max')}
          isInitialize={get(query, 'isInitialize') || true}
          initialFilter={get(query, 'initialFilter')}
          name={get(query, 'name')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientClaimTableWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default PatientClaimTableWidget
