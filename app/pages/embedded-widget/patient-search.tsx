import * as React from 'react'

import { IPaginationOption, ISortType } from '@components/hooks/usePatientList'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { IPatientFilterValue } from '@components/templates/patient/PatientFilterBar'
import PatientSearch from '@components/widget/patient/PatientSearch'
import {
  Container,
  CssBaseline,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { parse } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  body: {},
  root: {
    paddingTop: '30px',
  },
}))

export interface IStatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const PatientSearchView: IStatelessPage<{
  query: IPaginationOption
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient']}>
      <>
        <CssBaseline />
        <Container maxWidth='lg' className={classes.root}>
          <Typography component='div' className={classes.body}>
            <PatientSearch query={query} />
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

PatientSearchView.getInitialProps = async ({ query }) => {
  return {
    query: initialPagination(query),
  }
}

export function initialPagination(query: any) {
  const initialFilter: IPatientFilterValue = {
    gender: 'all',
    searchText: '',
  }

  const initialSort: ISortType = {
    order: 'asc',
    orderBy: 'id',
  }

  query = parse(query)

  return {
    filter: _.isEmpty(query.filter) ? initialFilter : query.filter,
    max: query.max ? Number(query.max) : 10,
    offset: query.offset ? Number(query.offset) : 0,
    page: query.page ? Number(query.page) : 0,
    sort: _.isEmpty(query.sort) ? initialSort : query.sort,
  }
}

export default PatientSearchView
