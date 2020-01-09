import BootstrapWrapper from '@components/init/BootstrapWrapper'
import DiagnosticReportCard, {
  DiagnosticReportCardWithoutModal,
} from '@components/widget/medical-records/DiagnosticReportCard'
import {
  Container,
  CssBaseline,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px',
  },
}))

const DianosticReportCard: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  return (
    <BootstrapWrapper
      dependencies={['diagnostic_report', 'patient', 'encounter']}
    >
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Typography component='div' className={classes.root}>
            {query.isIncludeModal ? (
              <DiagnosticReportCard />
            ) : (
              <DiagnosticReportCardWithoutModal />
            )}
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

DianosticReportCard.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default DianosticReportCard
