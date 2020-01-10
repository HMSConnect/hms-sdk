import BootstrapWrapper from '@components/init/BootstrapWrapper'
import EncounterInfoDetail from '@components/widget/encounter/EncounterInfoDetail'
import { Container, CssBaseline, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { IStatelessPage } from '@pages/patient-search'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px',
  },
}))

const EncounterMedicalRecords: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper
      dependencies={[
        'encounter',
        'diagnostic_report',
        'observation',
        'allergy_intolerance'
      ]}
    >
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Typography component='div' className={classes.root}>
            <EncounterInfoDetail query={query} />
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

EncounterMedicalRecords.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default EncounterMedicalRecords
