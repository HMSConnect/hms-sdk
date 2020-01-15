import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientInfoDetail from '@components/widget/patient/PatientInfoDetail'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { IStatelessPage } from '@pages/patient-search'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px',
  },
}))

const PatientInfoView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper
      dependencies={[
        'patient',
        'encounter',
        'diagnostic_report',
        'observation',
        'immunization'
      ]}
    >
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Typography component='div' className={classes.root}>
            <PatientInfoDetail query={query} />
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

PatientInfoView.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default PatientInfoView
