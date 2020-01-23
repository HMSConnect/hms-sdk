import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientDemographic from '@components/widget/patient/PatientDemographic'
import { CssBaseline, makeStyles, Paper, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientDemographicWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient']}>
      <>
        <CssBaseline />
        <Paper>
          <PatientDemographic query={query} />
        </Paper>
      </>
    </BootstrapWrapper>
  )
}

PatientDemographicWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default PatientDemographicWidget
