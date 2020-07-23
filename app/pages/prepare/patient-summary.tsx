import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PreparePatientData from '@components/widget/PreparePatientData'
import environment from '@environment'
import { CssBaseline, Typography } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import * as _ from 'lodash'
import * as React from 'react'

const PatientInfoView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['encounter']} mode={environment.mode}>
      <>
        <CssBaseline />
        <Typography component='div'>
          <PreparePatientData query={query} name={_.get(query, 'name')} />
        </Typography>
      </>
    </BootstrapWrapper>
  )
}

PatientInfoView.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default withAuthSync(PatientInfoView)
