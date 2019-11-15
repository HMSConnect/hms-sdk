import { Avatar, Grid, makeStyles } from '@material-ui/core'
import * as _ from 'lodash'
import React from 'react'

import PatientInfoPanel from '../../base/PatientInfoPanel'
import PatientInfoTable from '../../base/PatientInfoTable'
import usePatient from '../../hooks/usePatient'
import PatientMenuList from '../../templates/patient/PatientMenuList'
const useStyles = makeStyles(theme => ({
  bigAvatar: {
    height: 156,
    margin: 10,
    width: 156
  }
}))

const PatientInfoDetail: React.FunctionComponent<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  const { isLoading, data } = usePatient(
    _.get(query, 'id') || '13f9b410-5436-45bc-a6d3-b4dff5391295'
  )
  if (isLoading) {
    return <div>Loading!!!...</div>
  }
  const datas = [
    {
      label: 'Patient'
    },
    {
      label: 'Encounter'
    },
    {
      label: 'Medication'
    }
  ]
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Avatar
              alt='Remy Sharp'
              src='../../static/images/mock-person-profile.png'
              className={classes.bigAvatar}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={3}>
              <PatientInfoPanel info={data} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <PatientMenuList datas={datas} />
          </Grid>
          <Grid item xs={12} sm={8}>
            {<PatientInfoTable info={data} />}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default PatientInfoDetail
