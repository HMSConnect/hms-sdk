import React, { useEffect, useState } from 'react'

import {
  CircularProgress,
  Grid,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
import { stringify } from 'qs'

import routes from '../../../routes'

import Pagination, { IPageOptionResult } from '../../base/Pagination'
import usePatientList, {
  IPaginationOption,
  ISortType
} from '../../hooks/usePatientList'
import { IPatientFilterValue } from '../../templates/patient/PatientFilterBar'
import PatientSearchPanel from '../../templates/patient/PatientSearchPanel'
import PatientSearchResult from '../../templates/patient/PatientSearchResult'

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
  const [pagination, setPagination] = useState<IPaginationOption>(query)
  const [highlightText, setHighlightText] = useState<string>(
    query.filter.searchText
  )
  const { isLoading, data, totalCount } = usePatientList(pagination)

  useEffect(() => {
    if (!isLoading) {
      setPagination(query)
    }
    setHighlightText(query.filter.searchText)
  }, [query])

  const handleSearchSubmit = (filter: IPatientFilterValue) => {
    const queryString = stringify({
      ...pagination,
      filter: stringify(filter),
      offset: 0,
      page: 0,
      sort: stringify(pagination.sort)
    })

    routes.Router.replaceRoute(`/patient-search?${queryString}`)
  }

  const handleHilightChange = (value: string) => {
    setHighlightText(value)
  }

  const handleRequestSort = (sortObject: ISortType) => {
    const queryString = stringify({
      ...pagination,
      filter: stringify(pagination.filter),
      sort: stringify(sortObject)
    })
    routes.Router.replaceRoute(`/patient-search?${queryString}`)
  }

  const handlePageChage = (pageOptionResult: IPageOptionResult) => {
    const queryString = stringify({
      ...pageOptionResult,
      filter: stringify(pagination.filter),
      sort: stringify(pagination.sort)
    })
    routes.Router.replaceRoute(`/patient-search?${queryString}`)
  }

  const handlePatientSelect = (patient: any) => {
    routes.Router.pushRoute(`patient-info`, {
      id: _.get(patient, 'identifier.id.value')
    })
  }

  const handlePaginationReset = (event: React.MouseEvent) => {
    routes.Router.replaceRoute('/patient-search')
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PatientSearchPanel
            initialFilter={pagination.filter}
            onSearchSubmit={handleSearchSubmit}
            onPaginationReset={handlePaginationReset}
            onHightlightChange={handleHilightChange}
          />
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <PatientSearchResult
              patientList={data}
              sort={pagination.sort}
              onPatientSelect={handlePatientSelect}
              onRequestSort={handleRequestSort}
              highlightText={highlightText}
            />
          )}
        </Grid>
        <Grid container justify='flex-end'>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div className={classes.bottom}>
              <Pagination
                totalCount={totalCount}
                max={query.max}
                page={pagination.page}
                onPageChange={handlePageChage}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default PatientSearch
