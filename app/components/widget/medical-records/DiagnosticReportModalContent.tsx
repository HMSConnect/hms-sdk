import { Grid } from '@material-ui/core'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { IDiagnosticReportFilterQuery } from '../../../data-managers/DiagnosticReportDataManager'
import useDiagnosticReportList from '../../hooks/useDiagnosticReportList'
import { DiagnosticReportCardView } from './DiagnosticReportCard'
import DiagReportPatientData from '../../templates/DiagReportPatientData'

const DiagnosticReportModalContent: React.FunctionComponent<any> = ({}) => {
  const { query } = useRouter()
  const params = {
    encounterId: query.encounterId,
    patientId: query.patientId
  } as IDiagnosticReportFilterQuery

  const { isLoading, data: diagnosticReportList } = useDiagnosticReportList({
    filter: params,
    withObservation: true
  })

  if (isLoading) {
    return <div> loading ...</div>
  }

  return (
    <Grid item xs={12}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <DiagReportPatientData diagReportList={diagnosticReportList}/>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Grid container spacing={3}>
            {_.map(diagnosticReportList, diagnosticReport => {
              return (
                <div style={{ margin: 8 }}>
                  <DiagnosticReportCardView diagnostic={diagnosticReport} />
                </div>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DiagnosticReportModalContent
