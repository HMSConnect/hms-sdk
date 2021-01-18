import BootstrapWrapper from '@components/init/BootstrapWrapper'
import {
  PatientInfoDetailWithConnector
} from '@components/widget/patient/PatientInfoDetail'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import get from 'lodash/get'
import * as React from 'react'


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // height: '100vh',
  },
}))

const PatientInfoView: IStatelessPage<{
  query: any
}> = ({ query }) => {
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
        'imaging_study',
        'claim',
        'care_plan',
        'organization',
      ]}
    >
      <>
        <CssBaseline />
        <Typography component='div'>
          <PatientInfoDetailWithConnector
            patientId={get(query, 'patientId')}
            menuNavigate={get(query, 'menuNavigate')}
            max={get(query, 'max')}
            name={get(query, 'name')}
          />
        </Typography>
      </>
    </BootstrapWrapper>
  )
}

PatientInfoView.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default PatientInfoView
