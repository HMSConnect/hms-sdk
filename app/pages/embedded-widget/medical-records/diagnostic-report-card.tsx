import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import DiagnosticReportCard, {
  DiagnosticReportCardWithoutModal,
} from '@components/widget/medical-records/DiagnosticReportCard'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
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
        {query.isIncludeModal ? (
          <DiagnosticReportCard />
        ) : (
          <DiagnosticReportCardWithoutModal />
        )}
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
