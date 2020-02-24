import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core'
import * as _ from 'lodash'
import * as React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  bigAvatar: {
    height: theme.spacing(10),
    margin: 10,
    width: theme.spacing(10),
  },
  contentText: {
    color: '#37474f',
    fontWeight: 'normal',
  },
  headerTitle: {
    color: 'grey',
  },
  nameTitle: {
    color: '#808080',
  },
  root: {
    flexGrow: 1,
  },
  topicTitle: {
    color: 'grey',
  },
}))

export const PatientPhysicianWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.patientPhysician)
  return <PatientPhysician info={state?.info} />
}

const PatientPhysician: React.FunctionComponent<any> = ({ info }) => {
  const classes = useStyles({})

  return (
    <div>
      <Typography
        variant='body1'
        component='div'
        style={{ textAlign: 'center' }}
      >
        <Typography variant='h6' className={classes.nameTitle}>
          {_.get(info, 'practitioner') || 'Mr. Physician'}
        </Typography>
      </Typography>

      <Typography component='div' style={{ textAlign: 'center' }}>
        <Avatar className={classes.bigAvatar}>
          <Typography variant='h4' component='span' style={{ color: 'white' }}>
            PH
          </Typography>
        </Avatar>
      </Typography>
    </div>
  )
}

export default PatientPhysician
