import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BreadcrumbsBase from '@components/base/BreadcrumbsBase'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import AppNavBar from '@components/widget/AppNavBar'
import PatientSummary from '@components/widget/patient/PatientSummary'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { IStatelessPage } from '@pages/patient-search'
import get from 'lodash/get'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // height: '100vh',
    // paddingTop: '30px',
  },
}))

const EncounterPage: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />

      <BootstrapWrapper
        dependencies={[
          'allergy_intolerance',
          'condition',
          'diagnostic_report',
          'encounter',
          'observation',
          'patient',
          'immunization',
          'procedure',
          'medication_request',
          'imaging_study',
          'claim',
          'care_plan',
          'organization',
        ]}
      >
        <>
          {/* <Container maxWidth='lg'> */}
          <Typography component='div' className={classes.root}>
            <AppNavBar />
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
            <PatientSummary
              patientId={get(query, 'patientId')}
              encounterId={get(query, 'encounterId')}
              name={get(query, 'name')}
            />
            {/* <PatientInfoDetail query={query} /> */}
          </Typography>
          {/* </Container> */}
        </>
      </BootstrapWrapper>
    </React.Fragment>
  )
}

EncounterPage.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default EncounterPage
