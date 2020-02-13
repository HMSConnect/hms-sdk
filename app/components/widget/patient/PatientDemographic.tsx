import React from 'react'

import { Grid, makeStyles, Paper } from '@material-ui/core'
import RouteManager from '@routes/RouteManager'
import { sendMessage } from '@utils'
import * as _ from 'lodash'
import routes from '../../../routes'
import { IEnhancedTableProps } from '../../base/EnhancedTableHead'
import ObservationBloodPressureGraph from '../observation/ObservationBloodPressureGraph'
import ObservationBodyHeightGraph from '../observation/ObservationBodyHeightGraph'
import ObservationBodyWeightGraph from '../observation/ObservationBodyWeightGraph'
import ObservationLaboratoryTable from '../observation/ObservationLaboratoryTable'
import ObservationSummaryGraph from '../observation/ObservationSummaryGraph'
import PatientDemograhicSummary from './PatientDemograhicSummary'
import PatientEncounterTimeline from './PatientEncounterTimeline'
import PatientInfoPanel from './PatientInfoPanel'
import PatientMedicationList from './PatientMedication'

export interface IPatientTableProps {
  entry: any[]
  headerCells: IEnhancedTableProps[]
  bodyCells: any
}

export interface IPatientTableData {
  tableData: any
  tableNavigate: string
}
const useStyles = makeStyles(theme => ({
  associatedPatientCard: {
    flex: 1,
    height: '15em',
    margin: 8,
    marginTop: 0,
    overflow: 'auto',
    paddingBottom: '1em',
  },
  detailSelector: {
    flex: 1,
  },
  infoPanel: {
    padding: 8,
    // height: '15em',
  },
  laboratoryCardContent: {
    flex: 1,
    height: '34em',
    margin: 8,
    overflow: 'auto',
  },
  menuList: {
    height: '35em',
    margin: 8,
    // position: 'sticky',
    overflow: 'auto',
    top: 0,
  },
  patientContent: {
    flex: 1,
    height: '100',
    margin: 8,
  },
  root: { height: '100%', display: 'flex' },
  virtalSignCard: {
    flex: 1,
    margin: 8,
    overflow: 'auto',
  },
}))

const PatientDemographic: React.FunctionComponent<{
  query: any
  name?: string
}> = ({ query, name = 'patientDemographic' }) => {
  const classes = useStyles()
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} lg={9} xl={10}>
          <Paper className={classes.infoPanel}>
            <PatientInfoPanel query={query} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} lg={3} xl={2}>
          <PatientAssociatedData query={query} />
        </Grid>
        <Grid item xs={12} sm={12} lg={8} xl={8}>
          <div className={classes.detailSelector}>
            <PatientDetailSub query={query} name={name} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} lg={4} xl={4}>
          <Paper className={classes.menuList}>
            <ObservationSummaryGraph
              query={query}
              optionsGraph={{
                standardSizeForResizeLegendToBottom: [
                  'xsmall',
                  'small',
                  'large',
                  'medium',
                ],
              }}
            />
            {/* <ObservationSummaryTestGraph
              query={query}
              optionsGraph={{
                standardSizeForResizeLegendToBottom: [
                  'xsmall',
                  'small',
                  'large',
                  'medium',
                ],
              }}
            /> */}
          </Paper>
        </Grid>
      </Grid>
      <PatientLabResult query={query} />
    </>
  )
}

const PatientLabResult: React.FunctionComponent<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8}>
        <Paper className={classes.laboratoryCardContent}>
          <ObservationLaboratoryTable
            key={`ObservationLaboratoryTable${_.get(query, 'encounterId')}`}
            patientId={_.get(query, 'patientId')}
            encounterId={_.get(query, 'encounterId')}
            isInitialize={true}
            max={query.max}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper className={classes.virtalSignCard}>
          <ObservationBloodPressureGraph
            // key={`ObservationBloodPressureGraph${_.get(query, 'encounterId')}`}
            query={query}
            optionStyle={{ height: 580 }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper className={classes.virtalSignCard}>
          <ObservationBodyHeightGraph
            // key={`ObservationBodyHeightGraph${_.get(query, 'encounterId')}`}
            query={query}
            optionStyle={{ height: 580 }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper className={classes.virtalSignCard}>
          <ObservationBodyWeightGraph
            // key={`ObservationBodyWeightGraph${_.get(query, 'encounterId')}`}
            query={query}
            optionStyle={{ height: 580 }}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}
const PatientDetailSub: React.FunctionComponent<{
  query: any
  name?: string
}> = ({ query, name = 'patientDetailSub' }) => {
  const classes = useStyles()

  const handleEncounterSelect = (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    const newParams = {
      encounterId: _.get(selectedEncounter, 'id'),
      patientId: _.get(query, 'patientId'),
    }
    const path = RouteManager.getPath(`patient-demographic`, {
      matchBy: 'url',
      params: newParams,
    })
    sendMessage({
      action: 'PUSH_ROUTE',
      message: 'handleEncounterSelect',
      name,
      params: newParams,
      path,
    })
    routes.Router.replaceRoute(path)
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={5}>
        <Paper className={classes.menuList}>
          <PatientEncounterTimeline
            patientId={_.get(query, 'patientId')}
            selectedEncounterId={_.get(query, 'encounterId')}
            isInitialize={true}
            max={query.max}
            onEncounterSelected={handleEncounterSelect}
            name={`${name}EncounterTimeline`}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={7}>
        <div className={classes.menuList}>
          <PatientDemograhicSummary
            key={`PatientDemograhicSummary${_.get(query, 'encounterId')}`}
            query={query}
            name={`${name}DemographicSuumary`}
          />
        </div>
      </Grid>
    </Grid>
  )
}

const PatientAssociatedData: React.FunctionComponent<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper className={classes.associatedPatientCard}>
            <PatientMedicationList
              patientId={_.get(query, 'patientId')}
              isInitialize={true}
              name={`${name}MedicationList`}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default PatientDemographic
