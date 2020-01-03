import React, { useEffect, useRef } from 'react'

import { CircularProgress, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'

import { sendMessage } from '../../../pages/embedded-widget'
import routes from '../../../routes'
import RouterManager from '../../../routes/RouteManager'
import EncounterService from '../../../services/EncounterService'
import { HMSService } from '../../../services/HMSServiceFactory'
import { IHeaderCellProps } from '../../base/EnhancedTableHead'
import useInfinitScroll from '../../hooks/useInfinitScroll'
import PatientEncounterList from '../../templates/PatientEncounterList'

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
  patientId: any
  resourceList?: any[]
  isInitialize?: boolean
}> = ({ patientId, resourceList, isInitialize }) => {
  const classes = useStyles()

  const myscroll = useRef<HTMLDivElement | null>(null)

  const { data, error, isLoading, setIsFetch } = useInfinitScroll(
    myscroll.current,
    fetchMoreAsync,
    resourceList
  )

  useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  async function fetchMoreAsync(lastEntry: any) {
    const encounterService = HMSService.getService(
      'encounter'
    ) as EncounterService

    const newLazyLoad = {
      filter: {
        patientId,
        periodStart_lt: _.get(lastEntry, 'startTime')
      },
      max: 10
    }

    const entryData = await encounterService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      sendMessage({
        error: _.get(entryData, 'error')
      })
      return Promise.reject(new Error(entryData.error))
    }

    sendMessage({
      message: 'handleLoadMore',
      params: newLazyLoad
    })

    return Promise.resolve(_.get(entryData, 'data'))
  }

  const handleEncounterSelect = async (
    event: React.MouseEvent,
    selectedEncounter: any
  ) => {
    const newParams = {
      encounterId: _.get(selectedEncounter, 'id'),
      patientId
    }
    const path = RouterManager.getPath(
      `patient-info/${patientId}/encounter/${_.get(selectedEncounter, 'id')}`,
      {
        matchBy: 'url'
      }
    )
    sendMessage({
      action: 'PUSH_ROUTE',
      message: 'handleEncounterSelect',
      params: newParams,
      path
    })
    routes.Router.pushRoute(path, newParams)
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
