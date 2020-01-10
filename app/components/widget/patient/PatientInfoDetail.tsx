import {
  Avatar,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core'
import { sendMessage } from '@utils'
import * as _ from 'lodash'
import React, { useState } from 'react'
import routes from '../../../routes'
import RouteManager from '../../../routes/RouteManager'
import { IEnhancedTableProps } from '../../base/EnhancedTableHead'
import usePatient from '../../hooks/usePatient'
import useResourceList from '../../hooks/useResourceList'
import PatientInfoPanel from '../../templates/patient/PatientInfoPanel'
import PatientInfoTable from '../../templates/patient/PatientInfoTable'
import PatientMenuList from '../../templates/patient/PatientMenuList'
import EncounterInfoDetail from '../encounter/EncounterInfoDetail'
import PatientConditionTable from './PatientConditionTable'
import PatientEncounterTimeline from './PatientEncounterTimeline'
import PatientAllergyIntolerance from './PatientAllergyIntolerance'

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
  panel: {
    paddingTop: '30px',
  },
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
      <div className={classes.panel}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Avatar
                alt='Remy Sharp'
                src='../../../static/images/mock-person-profile.png'
                className={classes.bigAvatar}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={3}>
                <Paper style={{ padding: '1em' }}>
                  <PatientInfoPanel patient={patient} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.panel}>
        <PatientDetailSelector patient={patient} query={query} />
      </div>
    </>
  )
}

const PatientDetailSelector: React.FunctionComponent<any> = ({
  query,
  patient,
}) => {
  let PatientDetail = PatientInfoDetailSub

  if (query.encounterId) {
    PatientDetail = EncounterInfoDetail
  }

  return <PatientDetail patient={patient} query={query} />
}

const PatientInfoDetailSub: React.FunctionComponent<{
  patient: any
  query: any
}> = ({ patient, query }) => {
  const {
    isLoading: isGroupResourceListLoading,
    data: groupResourceList,
    error,
  } = useResourceList(_.get(patient, 'identifier.id.value'))
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
    const resource = _.find(groupResourceList, ['resourceType', navigate])
    switch (navigate) {
      case 'patient':
        return <PatientInfoTable patient={patient} />
      case 'encounter':
        return (
          <PatientEncounterTimeline
            patientId={_.get(patient, 'identifier.id.value')}
            resourceList={_.get(resource, 'data')}
          />
        )
      case 'condition':
        return (
          <PatientConditionTable
            patientId={_.get(patient, 'identifier.id.value')}
            resourceList={_.get(resource, 'data')}
          />
        )
      case 'allergy_intolerance':
        return (
          <PatientAllergyIntolerance
            patientId={_.get(patient, 'identifier.id.value')}
            resourceList={_.get(resource, 'data')}
          />
        )
      default:
        return <div> Comming soon </div>
    }
  }

  if (isGroupResourceListLoading) {
    return <CircularProgress />
  }

  return (
    <Grid item xs={12}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <PatientMenuList
            menuList={groupResourceList}
            navigate={menuNavigate}
            onNavigateChange={handleNavigateChange}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          {renderInformationTable(menuNavigate)}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PatientInfoDetail
