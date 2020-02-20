import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientSummaryCards from '@components/widget/patient/PatientSummaryCards'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientDemographicSummaryWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <PatientSummaryCards query={query} name={_.get(query, 'name')} />
      </>
    </BootstrapWrapper>
  )
}

PatientDemographicSummaryWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default PatientDemographicSummaryWidget
