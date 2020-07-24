import { withAuthSync } from '@components/base/Auth'
import Tracker from '@components/base/Tracker'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { PatientSummaryWithConnector } from '@components/widget/patient/PatientSummary'
import environment from '@environment'
import { CssBaseline, makeStyles, Paper, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import get from 'lodash/get'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientSummaryWidget: IStatelessPage<{
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
        'imaging_study',
        'claim',
        'care_plan',
        'organization',
        'practitioner',
      ]}
      mode={environment.mode}
    >
      <Tracker>
        <>
          <CssBaseline />
          <Paper>
            <PatientSummaryWithConnector
              patientId={get(query, 'patientId')}
              encounterId={get(query, 'encounterId')}
              name={get(query, 'name')}
            />
          </Paper>
        </>
      </Tracker>
    </BootstrapWrapper>
  )
}

PatientSummaryWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientSummaryWidget)
