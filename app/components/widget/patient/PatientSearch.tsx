import React, { useEffect, useState } from 'react'

import { Grid, makeStyles, Theme } from '@material-ui/core'
import * as _ from 'lodash'
import { sendMessage } from '../../../pages/embeded-widget'
import routes from '../../../routes'
import RouterManager from '../../../routes/RouteManager'
import { IPageOptionResult } from '../../base/Pagination'
import { IPaginationOption, ISortType } from '../../hooks/usePatientList'
import { IPatientFilterValue } from '../../templates/patient/PatientFilterBar'
import PatientSearchPanel from './PatientSearchPanel'
import PatientSearchResultWithPaginate from './PatientSearchResultWithPaginate'

const useStyles = makeStyles((theme: Theme) => ({
  bottom: {
    bottom: '1em',
    justifyContent: 'flex-end',
    position: 'absolute'
  },
  root: {}
}))

const PatientSearch: React.FunctionComponent<{
  query: IPaginationOption
}> = ({ query }) => {
  const classes = useStyles()
  const [highlightText, setHighlightText] = useState<string>(
    query.filter.searchText
  )
  const [pagination, setPagination] = useState<IPaginationOption>(query)

  useEffect(() => {
    setPagination(query)
    setHighlightText(query.filter.searchText)
  }, [query])

  const handleSearchSubmit = (filter: IPatientFilterValue) => {
    const newPagination = {
      ...pagination,
      filter,
      offset: 0,
      page: 0,
      sort: pagination.sort
    }

    const path = RouterManager.getPath('patient-search', {
      matchBy: 'url',
      params: newPagination
    })

    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handleSearchSubmit',
      params: newPagination,
      path
    })

    routes.Router.replaceRoute(path)
  }

  const handleHighlightChange = (value: string) => {
    setHighlightText(value)
  }

  const handleRequestSort = (sortObject: ISortType) => {
    const newPagination = {
      ...pagination,
      filter: pagination.filter,
      sort: sortObject
    }

    const path = RouterManager.getPath('patient-search', {
      matchBy: 'url',
      params: newPagination
    })

    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handleRequestSort',
      params: newPagination,
      path
    })

    routes.Router.replaceRoute(path)
  }

  const handlePageChange = (pageOptionResult: IPageOptionResult) => {
    const newPagination = {
      ...pageOptionResult,
      filter: pagination.filter,
      sort: pagination.sort
    }

    const path = RouterManager.getPath('patient-search', {
      matchBy: 'url',
      params: newPagination
    })

    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handlePageChange',
      params: newPagination,
      path
    })

    routes.Router.replaceRoute(path)
  }

  const handlePatientSelect = (patient: any) => {
    const path = RouterManager.getPath(`patient-info`)
    const params = {
      id: _.get(patient, 'identifier.id.value')
    }

    sendMessage({
      action: 'PUSH_ROUTE',
      message: 'handlePatientSelect',
      params,
      path
    })

    routes.Router.pushRoute(path, params)
  }

  const handlePaginationReset = (event: React.MouseEvent) => {
    const path = RouterManager.getPath(`patient-search`)

    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handlePaginationReset',
      params: null,
      path
    })

    routes.Router.replaceRoute(path)
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PatientSearchPanel
            initialFilter={pagination.filter}
            onSearchSubmit={handleSearchSubmit}
            onPaginationReset={handlePaginationReset}
            onHightlightChange={handleHighlightChange}
          />
        </Grid>
        <PatientSearchResultWithPaginate
          highlightText={highlightText}
          paginationOption={pagination}
          onPatientSelect={handlePatientSelect}
          onPageChange={handlePageChange}
          onRequestSort={handleRequestSort}
        />
      </Grid>
    </>
  )
}

export default PatientSearch
