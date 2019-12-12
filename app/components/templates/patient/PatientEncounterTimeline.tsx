import React, { useState } from 'react'

import { Button, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'

import routes from '../../../routes'
import EncounterService from '../../../services/EncounterService'
import { HMSService } from '../../../services/HMSServiceFactory'
import { IHeaderCellProps } from '../../base/EnhancedTableHead'
import useLazyLoad, { ILazyLoadOption } from '../../hooks/useLazyLoad'
import DiagReportPatientData from '../DiagReportPatientData'
import PatientEncounterList from '../PatientEncounterList'
import DiagnosticReportCard from '../../widget/medical-records/DiagnosticReportCard'

const useStyles = makeStyles((theme: Theme) => ({
  listRoot: {
    height: '60vh',
    overflowY: 'scroll',
    width: '50em'
  },
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
  const [lazyLoadOption, setLazyLoad] = useState<ILazyLoadOption>({
    filter: {
      patientId: _.get(patient, 'identifier.id.value')
    },
    max: 10
  })

  const {
    data,
    isLoading,
    setResult,
    isMore,
    setIsMore,
    setIsFetch
  } = useLazyLoad(resourceList, fetchMoreAsync)

  async function fetchMoreAsync() {
    const encounterService = HMSService.getService(
      'encounter'
    ) as EncounterService
    return await encounterService.list(lazyLoadOption)
  }

  const handleEncounterSelect = async (
    event: React.MouseEvent,
    selectedEncounter: any
  ) => {
    routes.Router.replaceRoute(`patient-info/encounter`, {
      encounterId: _.get(selectedEncounter, 'id'),
      patientId: _.get(patient, 'identifier.id.value')
    })
  }

  const handleLazyLoad = (event: any, type?: string) => {
    const lastEntry = _.last(data)
    setLazyLoad(prevLazyLoad => ({
      ...prevLazyLoad,
      filter: {
        ...prevLazyLoad.filter,
        periodStart_lt: _.get(lastEntry, 'startTime'),
        type: type ? type : prevLazyLoad.filter.type
      }
    }))
    setIsFetch(true)
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={10}>
          <Typography variant='h6'>Encounter</Typography>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.listRoot}>
            <PatientEncounterList
              entryList={data}
              onEntrySelected={handleEncounterSelect}
            />
          </div>
        </Grid>
        {isMore ? (
          <Grid item xs={3}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleLazyLoad}
            >
              <Typography variant='body1'>Load More</Typography>
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </>
  )
}

export default PatientEncounterTimeline
