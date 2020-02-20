import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientDemographic from '@components/widget/patient/PatientDemographic'
import { CssBaseline, makeStyles, Paper, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import * as _ from 'lodash'

const PatientInfoPanelWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['patient', 'allergy_intolerance']}>
      <>
        <CssBaseline />
        <Paper>
          <div style={{ height: '100vh' }}>
            <PatientDemographic query={query} name={_.get(query, 'name')} />
          </div>
        </Paper>
      </>
    </BootstrapWrapper>
  )
}

PatientInfoPanelWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default PatientInfoPanelWidget
