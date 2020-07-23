import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { PatientImmunizationTableWithConnector } from '@components/widget/patient/PatientImmunizationTable'
import environment from '@environment'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientImmunizationWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper
      dependencies={['patient', 'immunization']}
      mode={environment.mode}
    >
      <>
        <CssBaseline />
        <PatientImmunizationTableWithConnector
          patientId={get(query, 'patientId')}
          max={get(query, 'max')}
          isInitialize={get(query, 'isInitialize') || true}
          initialFilter={get(query, 'initialFilter')}
          isContainer={false}
          name={get(query, 'name')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientImmunizationWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientImmunizationWidget)
