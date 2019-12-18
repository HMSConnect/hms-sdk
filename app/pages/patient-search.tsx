import React from 'react'

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
import BreadcrumbsBase from '../components/base/BreadcrumbsBase'
import {
  IPaginationOption,
  ISortType
} from '../components/hooks/usePatientList'
import WrappedBootstrapper from '../components/init/WrappedBootstrap'
import { IPatientFilterValue } from '../components/templates/patient/PatientFilterBar'
import PatientSearch from '../components/widget/patient/PatientSearch'

const useStyles = makeStyles((theme: Theme) => ({
  body: {},
  root: {
    paddingTop: '30px'
  }
}))

export interface IStatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const PatientSearchView: IStatelessPage<{
  query: IPaginationOption
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <WrappedBootstrapper dependencies={['patient']}>
      <>
        <CssBaseline />
        <Container maxWidth='lg' className={classes.root}>
          <Typography component='div' className={classes.body}>
            <BreadcrumbsBase
              currentPath='Patient Search'
              parentPath={[
                {
                  icon: <HomeIcon />,
                  label: 'Home',
                  url: '/'
                }
              ]}
            ></BreadcrumbsBase>
            <PatientSearch query={query} />
          </Typography>
        </Container>
      </>
    </WrappedBootstrapper>
  )
}

PatientSearchView.getInitialProps = async ({ query }) => {
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

export default PatientSearchView
