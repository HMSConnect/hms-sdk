import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { ObservationBodyMassIndexGraphWithConnector } from '@components/widget/observation/ObservationBodyMassIndexGraph'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'
import * as React from 'react'


const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const ObservationBodyMassIndexGraphWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <ObservationBodyMassIndexGraphWithConnector
          patientId={get(query, 'patientId')}
          optionStyle={get(query, 'optionStyle')}
          max={get(query, 'max')}
        />
      </>
    </BootstrapWrapper>
  )
}

ObservationBodyMassIndexGraphWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default ObservationBodyMassIndexGraphWidget
