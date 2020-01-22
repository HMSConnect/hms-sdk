import * as React from 'react'
import { CircularProgress } from '@material-ui/core'

import * as _ from 'lodash'
import useEncounterList from '@components/hooks/useEncounterList'
import RouteManager from '@routes/RouteManager'
import { sendMessage } from '@utils'

import routes from '../../routes'

const PreparePatientData: React.FunctionComponent<any> = ({ query }) => {
  const {
    isLoading: isPatientLoading,
    data: encounter,
    error,
  } = useEncounterList({
    filter: { patientId: _.get(query, 'patientId') },
    max: 1,
    withOrganization: true,
  })

  React.useEffect(() => {
    if (!isPatientLoading && encounter) {
      const newParams = {
        encounterId: _.get(encounter[0], 'id'),
        patientId: _.get(query, 'patientId'),
      }
      const path = RouteManager.getPath(
        `patient-info/${_.get(query, 'patientId')}/encounter/${_.get(
          encounter[0],
          'id',
        )}`,
        {
          matchBy: 'url',
        },
      )
      sendMessage({
        action: 'PUSH_ROUTE',
        message: 'handleEncounterSelect',
        params: newParams,
        path,
      })
      routes.Router.replaceRoute(path, newParams)
    }
  }, [encounter, isPatientLoading])
  return <CircularProgress />
}

export default PreparePatientData
