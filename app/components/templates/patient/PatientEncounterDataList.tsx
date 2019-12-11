import { Grid, Theme, Typography, Button, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'
import React, { useState } from 'react'
import EncounterService from '../../../services/EncounterService'
import { HMSService } from '../../../services/HMSServiceFactory'
import { IHeaderCellProps } from '../../base/EnhancedTableHead'
import useLazyLoad, { ILazyLoadOption } from '../../hooks/useLazyLoad'
import PatientEncounterList from '../PatientEncounterList'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: 'center'
  },
  listRoot: {
    width: '50em',
    height: '60vh',
    overflowY: 'scroll'
  },
  tableWrapper: {
    maxHeight: '55vh',
    overflow: 'auto'
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  flexExpantion: {
    display: 'flex',
    flexDirection: 'column'
  },
  nested: {
    paddingLeft: theme.spacing(4)
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

const PatientEncounterDataList: React.FunctionComponent<{
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

  const handleEncounterSelect = (
    event: React.MouseEvent,
    selectedEncounter: any
  ) => {
    console.log('handleEncounterSelect :')
    // TODO handle select encounter
  }

  const resetFilter = () => {
    const patientIdFilter = _.get(lazyLoadOption, 'filter.patientId')
    const filter = {
      patientId: patientIdFilter,
      periodStart_lt: undefined,
      type: undefined
    }
    setLazyLoad(prevLazyLoad => ({
      ...prevLazyLoad,
      filter
    }))
    return filter
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
        {/* <Grid item xs={1}>
          <Divider
            orientation='vertical'
            variant='middle'
            style={{ zIndex: 1000 }}
          />
        </Grid> */}
        <Grid item xs={10}>
          <div className={classes.listRoot}>
            <PatientEncounterList entryList={data} onEntrySelected={handleEncounterSelect}/>
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
      {/* <ul>
        <li>
          <ExpansionPanel style={{ width: '30em' }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <div className={classes.flexExpantion}>
                <div style={{ flex: 1, flexDirection: 'column' }}>
                  <div style={{ flex: 1 }}>
                    <Typography>EN: 0000x</Typography>
                  </div>
                  <div style={{ justifyContent: 'flexEnd' }}>
                    {' '}
                    <Typography>Mon 8 June 10:30</Typography>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <Typography>
                    <LocalHospitalIcon /> Expansion Panel 1
                  </Typography>
                </div>
                <div style={{ flex: 1 }}>
                  <Typography>รับการรักษากับ แพทหญิง</Typography>
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Typography>ประเภทการรักษา: </Typography>
                <Typography>ผลการวินิจฉัย: </Typography>
                <Typography>Class Code: </Typography>
                <Typography>Status: </Typography>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </li>
        <li>
          <ExpansionPanel style={{ width: '30em' }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Expansion Panel 2</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>detail asdf ads</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </li>
        <li>
          <ExpansionPanel style={{ width: '30em' }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Expansion Panel 3</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>detail asdf ads</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </li>
      </ul> */}
    </>
  )
}

export default PatientEncounterDataList
