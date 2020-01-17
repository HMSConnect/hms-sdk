import BreadcrumbsBase from '@components/base/BreadcrumbsBase'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientInfoDetail from '@components/widget/patient/PatientInfoDetail'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import HomeIcon from '@material-ui/icons/Home'
import { IStatelessPage } from '@pages/patient-search'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // height: '100vh',
  },
}))

const PatientInfoView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
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
        'organization'
      ]}
    >
      <>
        <CssBaseline />
        <Typography component='div' className={classes.root}>
          <BreadcrumbsBase
            currentPath='Patient Info'
            parentPath={[
              {
                icon: <HomeIcon />,
                url: '/',
              },
              {
                label: 'Patient Search',
              },
            ]}
          />
          <PatientInfoDetail query={query} />
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

export default PatientInfoView
