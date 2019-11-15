import React, { useEffect, useState } from 'react'

import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
import { stringify } from 'qs'

import Patient from '../../../models/Patient'
import Pagination, { PageOptionResult } from '../../base/Pagination'
import usePatientList, { PaginationOption, SortType } from '../../hooks/usePatientList'
import { PatientFilterValue } from '../../templates/patient/PatientFilterBar'
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
  query: PaginationOption
}> = ({ query }) => {
  const classes = useStyles()
  const router = useRouter()
  const [pagination, setPagination] = useState<PaginationOption>(query)
  const { isLoading, data } = usePatientList(pagination)
  useEffect(() => {
    if (!isLoading) {
      setPagination(query)
    }
  }, [query])

  const handleSearchSubmit = (filter: PatientFilterValue) => {
    router.replace({
      pathname: '/patient-search',
      query: { ...pagination, offset: 0, page: 0, filter: stringify(filter) }
    })
  }

  const handleRequestSort = (sortObject: SortType) => {
    router.replace({
      pathname: '/patient-search',
      query: {
        ...pagination,
        filter: stringify(pagination.filter),
        sort: stringify(sortObject)
      }
    })
  }

  const handlePageChage = (pageOptionResult: PageOptionResult) => {
    router.replace({
      pathname: '/patient-search',
      query: {
        filter: stringify(pagination.filter),
        sort: stringify(pagination.sort),
        ...pageOptionResult
      }
    })
  }

  const handlePatientSelect = (patient: Patient) => {
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

  if (isLoading) {
    return <Typography>Loading...!!!</Typography>
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PatientSearchPanel
            initialFilter={pagination.filter}
            onSearchSubmit={handleSearchSubmit}
            onPaginationReset={handlePaginationReset}
          />
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            'Loading...!!!'
          ) : (
            <PatientSearchResult
              patientList={data.results}
              sort={pagination.sort}
              onPatientSelect={handlePatientSelect}
              onRequestSort={handleRequestSort}
            />
          )}
        </Grid>
        <Grid container item xs={12} justify='flex-end'>
          {isLoading ? (
            'Loading...!!!'
          ) : (
            <div className={classes.bottom}>
              <Pagination
                totalCount={data.totalCount}
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
