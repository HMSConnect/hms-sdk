import React, { useEffect, useState } from 'react'

import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import * as _ from 'lodash'
import { parse, stringify } from 'qs'

import { IPageOptionResult } from '../../components/base/Pagination'
import {
  IPaginationOption,
  ISortType
} from '../../components/hooks/usePatientList'
import BootstrapWrapper from '../../components/init/BootstrapWrapper'
import { IPatientFilterValue } from '../../components/templates/patient/PatientFilterBar'
import PatientSearchResultWithPaginate from '../../components/widget/patient/PatientSearchResultWithPaginate'
import environment from '../../config'
import routes from '../../routes'
import RouterManager from '../../routes/RouteManager'
import { IStatelessPage } from '../patient-search'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px'
  }
}))

const PatientSearchResultWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  const [pagination, setPagination] = useState<IPaginationOption>(query)

  useEffect(() => {
    setPagination(query)
  }, [query])

  const handleRequestSort = (sortObject: ISortType) => {
    const path = RouterManager.getPath('patient-search-result')
    const newPagination = {
      ...pagination,
      filter: stringify(pagination.filter),
      sort: stringify(sortObject)
    }
    window.parent.postMessage(
      {
        action: 'REPLACE_ROUTE',
        message: 'handleRequestSort',
        params: newPagination,
        path: `${path}?${stringify(newPagination)}`
      },
      environment.iframe.targetOrigin
    )
    routes.Router.replaceRoute(path, newPagination)
  }

  const handlePageChange = (pageOptionResult: IPageOptionResult) => {
    const path = RouterManager.getPath('patient-search-result')
    const newPagination = {
      ...pageOptionResult,
      filter: stringify(pagination.filter),
      sort: stringify(pagination.sort)
    }
    window.parent.postMessage(
      {
        action: 'REPLACE_ROUTE',
        message: 'handlePageChange',
        params: newPagination,
        path: `${path}?${stringify(newPagination)}`
      },
      environment.iframe.targetOrigin
    )
    routes.Router.replaceRoute(path, newPagination)
  }

  const handlePatientSelect = (patient: any) => {
    const path = RouterManager.getPath(`patient-info`)
    const params = {
      id: _.get(patient, 'identifier.id.value')
    }
    window.parent.postMessage(
      {
        action: 'PUSH_ROUTE',
        message: 'handlePatientSelect',
        params,
        path: `${path}/${_.get(patient, 'identifier.id.value')}`
      },
      environment.iframe.targetOrigin
    )
    routes.Router.pushRoute(path, params)
  }

  return (
    <BootstrapWrapper dependencies={['patient']}>
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Typography component='div' className={classes.root}>
            <PatientSearchResultWithPaginate
              paginationOption={pagination}
              onRequestSort={handleRequestSort}
              onPageChange={handlePageChange}
              onPatientSelect={handlePatientSelect}
            />
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

PatientSearchResultWidget.getInitialProps = async ({ query }) => {
  const initialFilter: IPatientFilterValue = {
    gender: 'all',
    searchText: ''
  }

  const initialSort: ISortType = {
    order: 'asc',
    orderBy: 'id'
  }
  return {
    query: initialPagination(query, initialFilter, initialSort)
  }
}

export function initialPagination(
  query: any,
  initialFilter: any,
  initialSort: any
) {
  return {
    filter: _.isEmpty(query.filter) ? initialFilter : parse(query.filter + ''),
    max: query.max ? Number(query.max) : 10,
    offset: query.offset ? Number(query.offset) : 0,
    page: query.page ? Number(query.page) : 0,
    sort: _.isEmpty(query.sort) ? initialSort : parse(query.sort + '')
  }
}

export default PatientSearchResultWidget
