import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientSummary from '@components/widget/patient/PatientSummary'
import { CssBaseline, makeStyles, Paper, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import * as _ from 'lodash'

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
      ]}
    >
      <>
        <CssBaseline />
        <Paper>
          <PatientSummary query={query} name={_.get(query, 'name')} />
        </Paper>
      </>
    </BootstrapWrapper>
  )
}

PatientSummaryWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientSummaryWidget)
