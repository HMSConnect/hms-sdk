import React from 'react'

import { Paper } from '@material-ui/core'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
import { IDiagnosticReportFilterQuery } from '../../../data-managers/DiagnosticReportDataManager'
import AdaptiveCard from '../../base/AdaptiveCard'
import { useModal } from '../../base/Modal'
import useLastDiagnosticReport from '../../hooks/useLastDiagnosticReport'
import disgnosticReportTemplate from '../../templates/adaptive-card/disgnosticReport.template.json'
import DiagnosticReportModalContent from './DiagnosticReportModalContent'

const DiagnosticReportCard: React.FunctionComponent<any> = () => {
  const { query } = useRouter()
  const params = {
    encounterId: query.encounterId,
    patientId: query.patientId
  } as IDiagnosticReportFilterQuery

  const { isLoading, data: diagnostic, error } = useLastDiagnosticReport({
    filter: params || {},
    withObservation: true
  })
  const { showModal, renderModal } = useModal(DiagnosticReportModalContent, {
    fullScreen: true,
    modalTitle: 'Diagnostic Report List'
  })

  if (error) {
    return <div>ERR: {error}.</div>
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <DiagnosticReportCardView onClick={showModal} diagnostic={diagnostic} />
      {renderModal}
    </>
  )
}

export const DiagnosticReportCardView: React.FunctionComponent<any> = ({
  templatePayload,
  diagnostic,
  isShowAction = true,
  onClick
}) => {
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
  return (
    <Paper style={{ height: '100%', overflowY: 'auto' }}>
      <AdaptiveCard
        data={{
          ...data,
          isShowAction
        }}
        templatePayload={templatePayload}
        onExecuteAction={onClick}
      />
    </Paper>
  )
}

DiagnosticReportCardView.defaultProps = {
  templatePayload: disgnosticReportTemplate
}

export default DiagnosticReportCard
