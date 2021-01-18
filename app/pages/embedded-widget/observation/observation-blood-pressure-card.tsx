import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { ObservationBloodPressureCardWithConnector } from '@components/widget/observation/ObservationBloodPressureCard'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import get from 'lodash/get'
import * as React from 'react'


const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const ObservationBloodPressureCardWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <div style={{ height: '100vh' }}>
          {/* <div style={_.get(query, 'optionStyle')}> */}
          <ObservationBloodPressureCardWithConnector
            patientId={get(query, 'patientId')}
            encounterId={get(query, 'encounterId')}
            isSelectable={get(query, 'isSelectable')}
          />
        </div>
      </>
    </BootstrapWrapper>
  )
}

ObservationBloodPressureCardWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default ObservationBloodPressureCardWidget
