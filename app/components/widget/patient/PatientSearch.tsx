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
  const router = useRouter()

  const [pagination, setPagination] = useState<IPaginationOption>(query)
  const [highlightText, setHighlightText] = useState<string>(
    query.filter.searchText
  )
  const { isLoading, data, totalCount } = usePatientList(pagination)
  useEffect(() => {
    if (!isLoading) {
      setPagination(query)
      setHighlightText(query.filter.searchText)
    }
  }, [query])

  const handleSearchSubmit = (filter: IPatientFilterValue) => {
    router.replace({
      pathname: '/patient-search',
      query: {
        ...pagination,
        offset: 0,
        page: 0,
        filter: stringify(filter),
        sort: stringify(pagination.sort)
      }
    })
  }

  const handleHilightChange = (value: string) => {
    setHighlightText(value)
  }

  const handleRequestSort = (sortObject: ISortType) => {
    router.replace({
      pathname: '/patient-search',
      query: {
        ...pagination,
        filter: stringify(pagination.filter),
        sort: stringify(sortObject)
      }
    })
  }

  const handlePageChage = (pageOptionResult: IPageOptionResult) => {
    router.replace({
      pathname: '/patient-search',
      query: {
        filter: stringify(pagination.filter),
        sort: stringify(pagination.sort),
        ...pageOptionResult
      }
    })
  }

  const handlePatientSelect = (patient: any) => {
    router.push({
      pathname: '/patient-info',
      query: { id: _.get(patient, 'identifier.id.value') }
    })
  }

  const handlePaginationReset = (event: React.MouseEvent) => {
    router.push({
      pathname: '/patient-search'
    })
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
