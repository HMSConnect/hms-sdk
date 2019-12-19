import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import React from 'react'
import WrappedBootstrapper from '../../components/init/WrappedBootstrap'
import { IPatientFilterValue } from '../../components/templates/patient/PatientFilterBar'
import PatientSearchPanel from '../../components/widget/patient/PatientSearchPanel'
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
        action: 'REPLACE_ROUTE',
        message: 'handleSearchSubmit',
        params: filter,
        path: ''
      },
      '*'
    )
  }
  const handlePaginationReset = (event: React.MouseEvent) => {
    window.parent.postMessage({ message: 'reset search' }, '*')
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
