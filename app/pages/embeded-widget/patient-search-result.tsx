import React, { useEffect, useState } from 'react'

import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import * as _ from 'lodash'
import { parse, stringify } from 'qs'

import { IPageOptionResult } from '../../components/base/Pagination'
import { IPaginationOption, ISortType } from '../../components/hooks/usePatientList'
import WrappedBootstrapper from '../../components/init/WrappedBootstrap'
import { IPatientFilterValue } from '../../components/templates/patient/PatientFilterBar'
import PatientSearchResultWithPaginate from '../../components/widget/patient/PatientSearchResultWithPaginate'
import routes from '../../routes'
import { IStatelessPage } from '../patient-search'


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px'
  }
}))

const PatientSearchResultWrapper: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <WrappedBootstrapper dependencies={['patient-search']}>
      <PatientSearchResultWidget query={query} />
    </WrappedBootstrapper>
  )
}

const PatientSearchResultWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  const [pagination, setPagination] = useState<IPaginationOption>(query)

  useEffect(() => {
    setPagination(query)
  }, [query])

  const handleRequestSort = (sortObject: ISortType) => {
    const newPagination = {
      ...pagination,
      filter: stringify(pagination.filter),
      sort: stringify(sortObject)
    }
    window.parent.postMessage(
      { message: 'Request sort', entry: newPagination },
      '*'
    )
    routes.Router.replaceRoute(`patient-search-result`, newPagination)
  }

  const handlePageChange = (pageOptionResult: IPageOptionResult) => {
    const newPagination = {
      ...pageOptionResult,
      filter: stringify(pagination.filter),
      sort: stringify(pagination.sort)
    }
    window.parent.postMessage(
      { message: 'Request sort', entry: newPagination },
      '*'
    )
    routes.Router.replaceRoute(`patient-search-result`, newPagination)
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Typography component='div' className={classes.root}>
          <PatientSearchResultWithPaginate
            paginationOption={pagination}
            onRequestSort={handleRequestSort}
            onPageChange={handlePageChange}
          />
        </Typography>
      </Container>
    </>
  )
}

PatientSearchResultWrapper.getInitialProps = async ({ query }) => {
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

export default PatientSearchResultWrapper
