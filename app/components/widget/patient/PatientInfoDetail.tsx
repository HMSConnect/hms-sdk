import React, { useState } from 'react'

import { Avatar, Grid, makeStyles, Paper, CircularProgress } from '@material-ui/core'
import * as _ from 'lodash'
import { IEnhancedTableProps } from '../../base/EnhancedTableHead'
import usePatient from '../../hooks/usePatient'
import useResourceList from '../../hooks/useResourceList'
import PatientEncounterTimeline from '../../templates/patient/PatientEncounterTimeline'
import PatientInfoPanel from '../../templates/patient/PatientInfoPanel'
import PatientInfoTable from '../../templates/patient/PatientInfoTable'
import PatientMenuList from '../../templates/patient/PatientMenuList'
import EncounterInfoDetail from '../encounter/EncounterInfoDetail'

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
    width: 156
  },
  panel: {
    paddingTop: '30px'
  }
}))

const PatientInfoDetail: React.FunctionComponent<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  const { isLoading: isPatientLoading, data: patient } = usePatient(
    _.get(query, 'patientId') || _.get(query, 'id')
  )

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
  patient
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
}> = ({ patient }) => {
  const {
    isLoading: isGroupResourceListLoading,
    data: groupResourceList
  } = useResourceList(_.get(patient, 'identifier.id.value'))

  const [menuNavigate, setMenuNavigate] = useState('patient')

  const handleNavigateChange = (newNavigateValue: string) => {
    if (menuNavigate !== newNavigateValue) {
      setMenuNavigate(newNavigateValue)
    }
  }

  const renderInformationTable = (navigate: string) => {
    const resource = _.find(groupResourceList, ['resourceType', navigate])
    switch (navigate) {
      case 'patient':
        return <PatientInfoTable patient={patient} />
      case 'encounter':
        return (
          <PatientEncounterTimeline
            patient={patient}
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
