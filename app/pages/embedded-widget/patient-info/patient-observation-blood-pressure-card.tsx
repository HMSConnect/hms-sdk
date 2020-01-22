import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import ObservationBloodPressureGraph from '@components/widget/observation/ObservationBloodPressureGraph'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientObservationBloodPressureWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <ObservationBloodPressureGraph
          key={`ObservationBloodPressureGraph${_.get(query, 'encounterId')}`}
          query={query}
          optionStyle={_.get(query, 'optionStyle') || { height: 400 }}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientObservationBloodPressureWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default PatientObservationBloodPressureWidget
