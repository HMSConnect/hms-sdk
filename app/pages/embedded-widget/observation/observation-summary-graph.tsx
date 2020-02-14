import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import ObservationBloodPressureCard from '@components/widget/observation/ObservationBloodPressureCard'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import * as _ from 'lodash'
import ObservationSummaryGraph from '@components/widget/observation/ObservationSummaryGraph'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const ObservationSummaryGraphWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <div style={{ height: '100vh' }}>
          {/* <div style={_.get(query, 'optionStyle')}> */}
          <ObservationSummaryGraph query={query} />
        </div>
      </>
    </BootstrapWrapper>
  )
}

ObservationSummaryGraphWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default ObservationSummaryGraphWidget
