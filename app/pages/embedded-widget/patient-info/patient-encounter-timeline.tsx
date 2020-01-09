import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientEncounterTimeline from '@components/widget/patient/PatientEncounterTimeline'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px',
  },
}))

const PatientEncounterTimelineView: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  return (
    <BootstrapWrapper dependencies={['patient', 'encounter']}>
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Typography component='div' className={classes.root}>
            <PatientEncounterTimeline
              patientId={get(query, 'patientId')}
              max={get(query, 'max')}
              isInitialize={get(query, 'isInitialize') || true}
            />
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

PatientEncounterTimelineView.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default PatientEncounterTimelineView
