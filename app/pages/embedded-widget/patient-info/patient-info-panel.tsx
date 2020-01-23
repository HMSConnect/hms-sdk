import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientInfoPanel from '@components/widget/patient/PatientInfoPanel'
import { CssBaseline, makeStyles, Paper, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientInfoPanelWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient']}>
      <>
        <CssBaseline />
        <Paper>
          <div style={{ height: '100vh' }}>
            <PatientInfoPanel query={query} />
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
