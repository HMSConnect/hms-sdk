import React from 'react'

import { Paper } from '@material-ui/core'

const EncounterInfoDetailSide: React.FunctionComponent<any> = ({
  encounter
}) => {
  return (
    <Paper>
      <h1>{encounter.classCode}</h1>

      <ul>
        <li></li>
        <li>{encounter.status}</li>
        <li>{encounter.startDateTime.toISOString()}</li>
        <li>{encounter.endDateTime.toISOString()}</li>
        <li>{encounter.type}</li>
        <li>{encounter.reason}</li>
      </ul>
    </Paper>
  )
}

export default EncounterInfoDetailSide
