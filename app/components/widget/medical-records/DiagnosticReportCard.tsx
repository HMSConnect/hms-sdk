import React from 'react'

import { Paper } from '@material-ui/core'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
import { IDiagnosticReportFilterQuery } from '../../../data-managers/DiagnosticReportDataManager'
import AdaptiveCard from '../../base/AdaptiveCard'
import useLastDiagnosticReport from '../../hooks/useLastDiagnosticReport'
import disgnosticReportTemplate from '../../templates/adaptive-card/disgnosticReport.template.json'

const DiagnosticReportCard: React.FunctionComponent<any> = ({
  templatePayload
}) => {
  const { query } = useRouter()
  const params = {
    encounterId: query.encounterId,
    patientId: query.patientId
  } as IDiagnosticReportFilterQuery

  const { isLoading, data: diagnostic, error } = useLastDiagnosticReport({
    filter: params || {},
    withObservation: true
  })

  const data = {
    issued: diagnostic.issued,
    results: _.map(diagnostic.result, observation => {
      return {
        display: observation.display,
        // iconUrl:
        //   'https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg',
        unit: observation.unit,
        value: `${observation.value}`
      }
    }),
    title: diagnostic.codeText
  }

  if (error) {
    return <div>ERR: {error}.</div>
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <Paper style={{ height: '100%', overflowY: 'auto' }}>
      <AdaptiveCard data={data} templatePayload={templatePayload} />
    </Paper>
  )
}

DiagnosticReportCard.defaultProps = {
  templatePayload: disgnosticReportTemplate
}

export default DiagnosticReportCard
