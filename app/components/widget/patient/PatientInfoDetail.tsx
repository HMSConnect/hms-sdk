import React, { useState } from 'react'

import {
  Avatar,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core'
import { sendMessage } from '@utils'
import * as _ from 'lodash'
import routes from '../../../routes'
import RouteManager from '../../../routes/RouteManager'
import { IEnhancedTableProps } from '../../base/EnhancedTableHead'
import usePatient from '../../hooks/usePatient'
import useResourceList from '../../hooks/useResourceList'
import PatientInfoPanel from '../../templates/patient/PatientInfoPanel'
import PatientInfoTable from '../../templates/patient/PatientInfoTable'
import PatientMenuList from '../../templates/patient/PatientMenuList'
import EncounterInfoDetail from '../encounter/EncounterInfoDetail'
import PatientAllergyIntoleranceTable from './PatientAllergyIntoleranceTable'
import PatientCarePlanTable from './PatientCarePlanTable'
import PatientClaimTable from './PatientClaimTable'
import PatientConditionTable from './PatientConditionTable'
import PatientEncounterTimeline from './PatientEncounterTimeline'
import PatientImagingStudyTable from './PatientImagingStudyTable'
import PatientImmunizationTable from './PatientImmunizationTable'
import PatientMedicationRequestTable from './PatientMedicationRequestTable'
import PatientObservationTable from './PatientObservationTable'
import PatientProcedureTable from './PatientProcedureTable'

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
  bigAvatar: {
    height: 156,
    margin: 10,
    width: 156,
  },
  detailSelector: {
    flex: 1,
  },
  infoPanel: {
    padding: 8,
  },
  menuList: {
    margin: 8,
    position: 'sticky',
    top: 0,
  },
  patientContent: {
    flex: 1,
    margin: 8,
  },
  root: { height: '100%', display: 'flex' },
}))

const PatientInfoDetail: React.FunctionComponent<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  const { isLoading: isPatientLoading, data: patient, error } = usePatient(
    _.get(query, 'patientId') || _.get(query, 'id'),
  )

  if (error) {
    return <>Error: {error}</>
  }

  if (isPatientLoading) {
    return <CircularProgress />
  }

  return (
    <>
      <div className={classes.infoPanel}>
        <Paper>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <Grid container justify='center' alignContent='center'>
                <Avatar
                  alt='Remy Sharp'
                  src='../../../static/images/mock-person-profile.png'
                  className={classes.bigAvatar}
                />
              </Grid>
            </Grid>
            <Grid item sm={9}>
              <PatientInfoPanel patient={patient} />
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div className={classes.detailSelector}>
        <PatientDetailSelector patient={patient} query={query} />
      </div>
    </>
  )
}

const PatientDetailSelector: React.FunctionComponent<any> = ({
  query,
  patient,
}) => {
  let PatientDetail = PatientDetailSub

  if (query.encounterId) {
    PatientDetail = EncounterInfoDetail
  }
  return <PatientDetail patient={patient} query={query}></PatientDetail>
}

const PatientDetailSub: React.FunctionComponent<{
  patient: any
  query: any
}> = ({ patient, query }) => {
  const classes = useStyles()
  const {
    isLoading: isGroupResourceListLoading,
    data: groupResourceList,
    error,
  } = useResourceList(_.get(patient, 'identifier.id.value'), {
    ...query,
    max: query.max || 20,
  })
  const [menuNavigate, setMenuNavigate] = useState(
    query.menuNavigate || 'patient',
  )

  const handleNavigateChange = (newNavigateValue: string) => {
    const params = {
      menuNavigate: newNavigateValue,
    }
    const path = RouteManager.getPath(
      `patient-info/${_.get(patient, 'identifier.id.value')}`,
      {
        matchBy: 'url',
        params,
      },
    )
    sendMessage({
      message: 'handleNavigateChange',
      params,
      path,
    })
    routes.Router.replaceRoute(path)
    setMenuNavigate(newNavigateValue)
  }

  const renderInformationTable = (navigate: string) => {
    // const resource = _.find(groupResourceList, ['resourceType', navigate])
    switch (navigate) {
      case 'patient':
        return <PatientInfoTable patient={patient} />
      case 'encounter':
        return (
          <PatientEncounterTimeline
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'condition':
        return (
          <PatientConditionTable
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'allergy_intolerance':
        return (
          <PatientAllergyIntoleranceTable
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'immunization':
        return (
          <PatientImmunizationTable
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'procedure':
        return (
          <PatientProcedureTable
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'medication_request':
        return (
          <PatientMedicationRequestTable
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'observation':
        return (
          <PatientObservationTable
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'imaging_study':
        return (
          <PatientImagingStudyTable
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'claim':
        return (
          <PatientClaimTable
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'care_plan':
        return (
          <PatientCarePlanTable
            patientId={_.get(patient, 'identifier.id.value')}
            // resourceList={_.get(resource, 'data')}
            isInitialize={true}
            max={query.max}
          />
        )
      default:
        return <div style={{ padding: 8 }}> Comming soon </div>
    }
  }

  if (isGroupResourceListLoading) {
    return <CircularProgress />
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={3}>
        <Paper className={classes.menuList}>
          <PatientMenuList
            menuList={groupResourceList}
            navigate={menuNavigate}
            onNavigateChange={handleNavigateChange}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper className={classes.patientContent}>
          {renderInformationTable(menuNavigate)}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default PatientInfoDetail
