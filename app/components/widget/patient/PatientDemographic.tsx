import React from 'react'

import {
  Avatar,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core'
import * as _ from 'lodash'
import { IEnhancedTableProps } from '../../base/EnhancedTableHead'
import usePatient from '../../hooks/usePatient'
import PatientInfoPanel from './PatientInfoPanel'
import ObservationBloodPressureGraph from '../observation/ObservationBloodPressureGraph'
import ObservationBodyHeightGraph from '../observation/ObservationBodyHeightGraph'
import ObservationBodyWeightGraph from '../observation/ObservationBodyWeightGraph'
import ObservationLaboratoryTable from '../observation/ObservationLaboratoryTable'
import PatientAllergyList from './PatientAllergyList'
import PatientDemograhicSummary from './PatientDemograhicSummary'
import PatientEncounterTimeline from './PatientEncounterTimeline'
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
    height: '13em',
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
  },
  laboratoryCardContent: {
    flex: 1,
    height: '34em',
    margin: 8,
    overflow: 'auto',
  },
  menuList: {
    height: '33em',
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
}> = ({ query }) => {
  const classes = useStyles()
  // const { isLoading: isPatientLoading, data: patient, error } = usePatient(
  //   _.get(query, 'patientId') || _.get(query, 'id'),
  // )

  // if (error) {
  //   return <>Error: {error}</>
  // }

  // if (isPatientLoading) {
  //   return <CircularProgress />
  // }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} lg={10}>
          <div className={classes.infoPanel}>
            <Paper>
              <PatientInfoPanel query={query} />
            </Paper>
          </div>
          <div className={classes.detailSelector}>
            <PatientDetailSub query={query} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} lg={2}>
          <PatientAssociatedData query={query} />
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
            key={`ObservationBloodPressureGraph${_.get(query, 'encounterId')}`}
            query={query}
            optionStyle={{ height: 580 }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper className={classes.virtalSignCard}>
          <ObservationBodyHeightGraph
            key={`ObservationBodyHeightGraph${_.get(query, 'encounterId')}`}
            query={query}
            optionStyle={{ height: 580 }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper className={classes.virtalSignCard}>
          <ObservationBodyWeightGraph
            key={`ObservationBodyWeightGraph${_.get(query, 'encounterId')}`}
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
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={4}>
        <Paper className={classes.menuList}>
          <PatientEncounterTimeline
            patientId={_.get(query, 'patientId')}
            selectedEncounterId={_.get(query, 'encounterId')}
            isInitialize={true}
            max={query.max}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <div className={classes.menuList}>
          <PatientDemograhicSummary query={query} />
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
        <Grid item xs={12} sm={6} md={6} lg={12}>
          <Paper className={classes.associatedPatientCard}>
            <PatientAllergyList
              patientId={_.get(query, 'patientId')}
              isInitialize={true}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={12}>
          <Paper className={classes.associatedPatientCard}>
            <PatientMedicationList
              patientId={_.get(query, 'patientId')}
              isInitialize={true}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default PatientDemographic
