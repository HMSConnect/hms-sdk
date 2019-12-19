import React from 'react'

import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { IPatientFilterValue } from '../../components/templates/patient/PatientFilterBar'
import PatientSearchPanel from '../../components/widget/patient/PatientSearchPanel'
import environment from '../../config'
import { IStatelessPage } from '../patient-search'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px'
  }
}))

const PatientSearchBar: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  const handleSearchSubmit = (filter: IPatientFilterValue) => {
    window.parent.postMessage(
      {
        action: null,
        message: 'handleSearchSubmit',
        params: filter,
        path: ''
      },
      environment.iframe.targetOrigin
    )
  }
  const handlePaginationReset = (event: React.MouseEvent) => {
    window.parent.postMessage(
      {
        action: null,
        message: 'handlePaginationReset',
        params: null,
        path: ''
      },
      environment.iframe.targetOrigin
    )
  }
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Typography component='div' className={classes.root}>
          <PatientSearchPanel
            initialFilter={query}
            onSearchSubmit={handleSearchSubmit}
            onPaginationReset={handlePaginationReset}
          />
        </Typography>
      </Container>
    </>
  )
}

PatientSearchBar.getInitialProps = async ({ req, res, query }) => {
  const initialFilter: IPatientFilterValue = {
    gender: 'all',
    searchText: ''
  }
  return {
    query: initialFilter
  }
}

export default PatientSearchBar
