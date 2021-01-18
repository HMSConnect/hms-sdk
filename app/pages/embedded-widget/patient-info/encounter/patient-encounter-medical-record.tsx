import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { PatientInfoDetailWithConnector } from '@components/widget/patient/PatientInfoDetail'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import * as _ from 'lodash'
import * as React from 'react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'


const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientInfoWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper
      dependencies={[
        'allergy_intolerance',
        'condition',
        'diagnostic_report',
        'encounter',
        'observation',
        'patient',
        'immunization',
        'procedure',
        'medication_request',
      ]}
    >
      <>
        <CssBaseline />
        <PatientInfoDetailWithConnector
          patientId={_.get(query, 'patientId')}
          menuNavigate={_.get(query, 'menuNavigate')}
          max={_.get(query, 'max')}
          name={_.get(query, 'name')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientInfoWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default PatientInfoWidget
