import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PreparePatientData from '@components/widget/PreparePatientData'
import { CssBaseline, Typography } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import * as _ from 'lodash'

const PatientInfoView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['encounter']}>
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
