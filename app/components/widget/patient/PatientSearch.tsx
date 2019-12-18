import React, { useEffect, useState } from 'react'

import { Grid, makeStyles, Theme } from '@material-ui/core'
import * as _ from 'lodash'
import { stringify } from 'qs'

import routes from '../../../routes'
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
    routes.Router.replaceRoute(`patient-search`, {
      ...pagination,
      filter: stringify(filter),
      offset: 0,
      page: 0,
      sort: stringify(pagination.sort)
    })
  }

  const handleHighlightChange = (value: string) => {
    setHighlightText(value)
  }

  const handleRequestSort = (sortObject: ISortType) => {
    routes.Router.replaceRoute(`patient-search`, {
      ...pagination,
      filter: stringify(pagination.filter),
      sort: stringify(sortObject)
    })
  }

  const handlePageChange = (pageOptionResult: IPageOptionResult) => {
    routes.Router.replaceRoute(`patient-search`, {
      ...pageOptionResult,
      filter: stringify(pagination.filter),
      sort: stringify(pagination.sort)
    })
  }

  const handlePatientSelect = (patient: any) => {
    window.parent.postMessage(
      { message: 'select Patient', entry: patient },
      '*'
    )
    routes.Router.pushRoute(`patient-info`, {
      id: _.get(patient, 'identifier.id.value')
    })
  }

  const handlePaginationReset = (event: React.MouseEvent) => {
    routes.Router.replaceRoute('patient-search')
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
