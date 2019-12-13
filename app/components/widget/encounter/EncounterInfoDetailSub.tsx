import React from 'react'

import { Paper } from '@material-ui/core'
import * as _ from 'lodash'
import GridSelection from '../../base/GridSelector'
import DiagnosticReportCard from '../medical-records/DiagnosticReportCard'

const EncounterInfoDetailSub: React.FunctionComponent<any> = ({
  encounter
}) => {
  return (
    <div>
      <GridSelection
        componentResource={{
          default: DefaultContent,
          diagnostic_report: DiagnosticReportCard
        }}
      />
    </div>
  )
}

const DefaultContent: React.FunctionComponent<any> = ({ i }) => {
  return <Paper style={{ height: '100%', padding: 8 }}>{i}</Paper>
}

export default EncounterInfoDetailSub
