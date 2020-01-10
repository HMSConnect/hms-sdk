import GridSelection from '@components/base/GridSelector'
import DiagnosticReportCard from '@components/widget/medical-records/DiagnosticReportCard'
import { Paper } from '@material-ui/core'
import * as React from 'react'
import AllergyIntoleranceCard from '../medical-records/AllergyIntoleranceCard'
import ObservationLaboratoryCard from '../medical-records/ObservationLaboratoryCard'
import ObservationVitalSignCard from '../medical-records/ObservationVitalSignCard'

const EncounterInfoDetailSub: React.FunctionComponent<any> = ({
  encounter,
  defaultDimention = '1xN',
}) => {
  return (
    <div>
      <GridSelection
        defaultDimention={defaultDimention}
        componentResource={{
          allergy: AllergyIntoleranceCard,
          // default: DefaultContent,
          diagnostic_report: DiagnosticReportCard,
          observation_laboratory: ObservationLaboratoryCard,
          observation_virtualSign: ObservationVitalSignCard,
        }}
      />
    </div>
  )
}

const DefaultContent: React.FunctionComponent<any> = ({ i }) => {
  return <Paper style={{ height: '100%', padding: 8 }}>{i}</Paper>
}

export default EncounterInfoDetailSub
