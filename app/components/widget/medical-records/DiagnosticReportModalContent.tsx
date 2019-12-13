import React from 'react'

import { Grid } from '@material-ui/core'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
import { IDiagnosticReportFilterQuery } from '../../../data-managers/DiagnosticReportDataManager'
import useDiagnosticReportList from '../../hooks/useDiagnosticReportList'
import DiagReportPatientData from '../../templates/DiagReportPatientData'
import { DiagnosticReportCardView } from './DiagnosticReportCard'

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
        <Grid item xs={12} sm={7}>
          <DiagReportPatientData diagReportList={diagnosticReportList} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Grid
            container
            spacing={3}
            style={{
              height: '80vh',
              overflowY: 'auto'
            }}
          >
            {_.map(diagnosticReportList, diagnosticReport => {
              return (
                <div style={{ margin: 8, width: '100%' }}>
                  <DiagnosticReportCardView
                    diagnostic={diagnosticReport}
                    isShowAction={false}
                  />
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
