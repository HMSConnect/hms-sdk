import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientMedicationList from '@components/widget/patient/PatientMedication'
import { CssBaseline, makeStyles, Paper, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientMedicationRequestListCardWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'medication_request']}>
      <>
        <CssBaseline />
        <Paper>
          <PatientMedicationList
            patientId={get(query, 'patientId')}
            max={get(query, 'max')}
            isInitialize={get(query, 'isInitialize') || true}
            initialFilter={get(query, 'initialFilter')}
            isContainer={false}
            name={get(query, 'name')}
          />
        </Paper>
      </>
    </BootstrapWrapper>
  )
}

PatientMedicationRequestListCardWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default PatientMedicationRequestListCardWidget
