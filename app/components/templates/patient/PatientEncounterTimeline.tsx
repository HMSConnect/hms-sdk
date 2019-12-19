import React, { useRef } from 'react'

import { CircularProgress, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'

import routes from '../../../routes'
import RouterManager from '../../../routes/RouteManager'
import EncounterService from '../../../services/EncounterService'
import { HMSService } from '../../../services/HMSServiceFactory'
import { IHeaderCellProps } from '../../base/EnhancedTableHead'
import useInfinitScroll from '../../hooks/useInfinitScroll'
import PatientEncounterList from '../PatientEncounterList'

const useStyles = makeStyles((theme: Theme) => ({
  listRoot: { maxHeight: '60vh', overflow: 'auto' },
  root: {
    justifyContent: 'center'
  }
}))

export interface IBodyCellProp {
  align: 'right' | 'left' | 'center'
  id: string
  styles?: any
}

export interface ITableCellProp {
  headCell: IHeaderCellProps
  bodyCell: IBodyCellProp
}

const PatientEncounterTimeline: React.FunctionComponent<{
  resourceList: any[]
  patient: any
}> = ({ resourceList, patient }) => {
  const classes = useStyles()

  const myscroll = useRef<HTMLDivElement | null>(null)

  const { data, error, isLoading } = useInfinitScroll(
    myscroll.current,
    fetchMoreAsync,
    resourceList
  )

  async function fetchMoreAsync(lastEntry: any) {
    const encounterService = HMSService.getService(
      'encounter'
    ) as EncounterService

    const newLazyLoad = {
      filter: {
        patientId: _.get(patient, 'identifier.id.value'),
        periodStart_lt: _.get(lastEntry, 'startTime')
      },
      max: 10
    }

    const entryData = await encounterService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }

    return Promise.resolve(_.get(entryData, 'data'))
  }

  const handleEncounterSelect = async (
    event: React.MouseEvent,
    selectedEncounter: any
  ) => {
    const path = RouterManager.getPath(`patient-info/encounter`)
    routes.Router.pushRoute(path, {
      encounterId: _.get(selectedEncounter, 'id'),
      patientId: _.get(patient, 'identifier.id.value')
    })
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={10}>
          <Typography variant='h6'>Encounter</Typography>
        </Grid>
        <Grid item xs={10}>
          <div ref={myscroll} className={classes.listRoot}>
            <PatientEncounterList
              entryList={data}
              onEntrySelected={handleEncounterSelect}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            {isLoading ? <CircularProgress /> : null}
          </div>
          {error ? <>There Have Error : {error}</> : null}
        </Grid>
      </Grid>
    </>
  )
}

export default PatientEncounterTimeline
