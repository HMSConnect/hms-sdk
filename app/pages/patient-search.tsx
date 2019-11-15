import {
  Container,
  CssBaseline,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import * as _ from 'lodash'
import { parse } from 'qs'
import React from 'react'

import BreadCrumbsCustom from '../components/base/BreadCrumbsCustom'
import { PaginationOption, SortType } from '../components/hooks/usePatientList'
import { PatientFilterValue } from '../components/templates/patient/PatientFilterBar'
import PatientSearch from '../components/widget/patient/PatientSearch'

const useStyles = makeStyles((theme: Theme) => ({
  body: {},
  root: {
    paddingTop: '30px'
  }
}))

export interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const PatientSearchView: StatelessPage<{
  query: PaginationOption
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg' className={classes.root}>
        <Typography component='div' className={classes.body}>
          <BreadCrumbsCustom
            currentPath='Patient Search'
            parentPath={[
              {
                icon: <HomeIcon />,
                label: 'Home',
                url: '/'
              }
            ]}
          ></BreadCrumbsCustom>
          <PatientSearch query={query} />
        </Typography>
      </Container>
    </>
  )
}

PatientSearchView.getInitialProps = async ({ query }) => {
  const initialFilter: PatientFilterValue = {
    gender: 'all',
    searchText: ''
  }

  const initialSort: SortType = {
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

export default PatientSearchView
