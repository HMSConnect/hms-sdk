import React from 'react'

import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { stringify } from 'querystring'
import { IPaginationOption } from '../../components/hooks/usePatientList'
import BootstrapWrapper from '../../components/init/BootstrapWrapper'
import { IPatientFilterValue } from '../../components/templates/patient/PatientFilterBar'
import PatientSearchPanel from '../../components/widget/patient/PatientSearchPanel'
import environment from '../../config'
import RouteManager from '../../routes/RouteManager'
import { HMSService } from '../../services/HMSServiceFactory'
import PatientService from '../../services/PatientService'
import { IStatelessPage } from '../patient-search'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px'
  }
}))

const PatientSearchBar: IStatelessPage<{
  initialQuery: any
  query: any
}> = ({ initialQuery, query }) => {
  const classes = useStyles()

  const [pagination, setPagination] = React.useState<IPaginationOption>(query)

  React.useEffect(() => {
    setPagination(query)
  }, [query])

  function fetchPatientList(options: any) {
    const patientService = HMSService.getService('patient') as PatientService
    return patientService.list(options)
  }

  const handleSearchSubmit = (filter: IPatientFilterValue) => {
    const path = RouteManager.getPath('patient-search-bar')
    const newPagination = {
      ...pagination,
      filter
    }

    fetchPatientList(newPagination).then(result => {
      window.parent.postMessage(
        {
          action: null,
          message: 'handleSearchSubmit',
          params: newPagination,
          path: `${path}/${stringify(newPagination)}`,
          result
        },
        environment.iframe.targetOrigin
      )
      setPagination(newPagination)
    })
  }

  const handlePaginationReset = (event: React.MouseEvent) => {
    const path = RouteManager.getPath('patient-search-bar')
    const newPagination = initialQuery

    fetchPatientList(newPagination).then(result => {
      window.parent.postMessage(
        {
          action: null,
          message: 'handlePaginationReset',
          params: newPagination,
          pathL: `${path}/${stringify(newPagination)}`,
          result
        },
        environment.iframe.targetOrigin
      )
      setPagination(initialQuery)
    })
  }

  return (
    <BootstrapWrapper dependencies={['patient']}>
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Typography component='div' className={classes.root}>
            <PatientSearchPanel
              initialFilter={pagination.filter}
              onSearchSubmit={handleSearchSubmit}
              onPaginationReset={handlePaginationReset}
            />
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

PatientSearchBar.getInitialProps = async ({ req, res, query }) => {
  const initialFilter: IPatientFilterValue = {
    gender: 'all',
    searchText: ''
  }
  const initialQuery = { filter: initialFilter, max: 10, offset: 0, page: 1 }

  return {
    initialQuery,
    query: {
      ...initialQuery,
      ...query
    }
  }
}

export default PatientSearchBar
