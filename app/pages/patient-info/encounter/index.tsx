import * as React from 'react'

import BreadcrumbsBase from '@components/base/BreadcrumbsBase'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientInfoDetail from '@components/widget/patient/PatientInfoDetail'
import { Container, CssBaseline, Theme, Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/styles'
import { IStatelessPage } from '@pages/patient-search'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px',
  },
}))

const EncounterPage: IStatelessPage<{
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
        'allergy_intolerance',
      ]}
    >
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Typography component='div' className={classes.root}>
            <BreadcrumbsBase
              currentPath='Patient Info'
              parentPath={[
                {
                  icon: <HomeIcon />,
                  label: 'Home',
                  url: '/',
                },
                {
                  label: 'Patient Search',
                },
              ]}
            ></BreadcrumbsBase>
            <PatientInfoDetail query={query} />
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

EncounterPage.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default EncounterPage
