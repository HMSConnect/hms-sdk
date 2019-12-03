import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'

import BreadcrumbsBase from '../components/base/BreadcrumbsBase'
import PatientInfoDetail from '../components/widget/patient/PatientInfoDetail'
import { IStatelessPage } from './patient-search'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px'
  }
}))

const PatientInfoView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
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
                url: '/'
              },
              {
                label: 'Patient Search',
                url: null
              }
            ]}
          ></BreadcrumbsBase>
          <PatientInfoDetail query={query} />
        </Typography>
      </Container>
    </>
  )
}

PatientInfoView.getInitialProps = async ({ req, res, query }) => {
  return {
    query
  }
}

export default PatientInfoView
