import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'

import BreadCrumbsCustom from '../components/base/BreadCrumbsCustom'
import PatientInfoDetail from '../components/widget/patient/PatientInfoDetail'
import { StatelessPage } from './patient-search'


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px'
  }
}))

const PatientInfoView: StatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Typography component='div' className={classes.root}>
          <BreadCrumbsCustom
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
          ></BreadCrumbsCustom>
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
