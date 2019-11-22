import * as _ from 'lodash'
import React, { useState } from 'react'

import { Avatar, Grid, makeStyles, Paper } from '@material-ui/core'

import { IEnhancedTableProps } from '../../base/EnhancedTableHead'
import usePatient from '../../hooks/usePatient'
import useResourceList from '../../hooks/useResourceList'
import PatientEncounterTable from '../../templates/patient/PatientEncounterTable'
import PatientInfoPanel from '../../templates/patient/PatientInfoPanel'
import PatientInfoTable from '../../templates/patient/PatientInfoTable'
import PatientMenuList from '../../templates/patient/PatientMenuList'

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
  const [menuNavigate, setMenuNavigate] = useState('patient')

  const { isLoading: isPatientLoading, data: patient } = usePatient(
    _.get(query, 'id')
  )
  const {
    isLoading: isGroupResourceListLoading,
    data: groupResourceList
  } = useResourceList(_.get(query, 'id'))
  const handleNavigateChange = (newNavigateValue: string) => {
    if (menuNavigate !== newNavigateValue) {
      setMenuNavigate(newNavigateValue)
    }
  }

  if (isPatientLoading || isGroupResourceListLoading) {
    return <div>Loading!!!...</div>
  }

  const renderInformationTable = (navigate: string) => {
    const resource = _.find(groupResourceList, ['resourceType', navigate])
    switch (navigate) {
      case 'patient':
        return <PatientInfoTable patient={patient} />
      case 'encounter':
        return (
          <PatientEncounterTable
            patient={patient}
            resourceList={_.get(resource, 'data')}
          />
        )
      default:
        return <div> Comming soon </div>
    }
  }

  return (
    <>
      <div className={classes.panel}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Avatar
                alt='Remy Sharp'
                src='../../static/images/mock-person-profile.png'
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
      </div>
    </>
  )
}

export default PatientInfoDetail
