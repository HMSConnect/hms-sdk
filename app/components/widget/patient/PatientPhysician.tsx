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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
  pos: {
    marginBottom: 12,
  },
  root: {
    // flexGrow: 1,
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  topicTitle: {
    color: 'grey',
  },
}))

export const PatientPhysicianWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.patientPhysician)
  return <PatientPhysician info={state?.info} />
}

const mockPhysicians = [
  {
    name: 'Mr. John Doe',
    phone: '081-22334455',
    specialist: 'Internist',
  },
  {
    name: 'Mrs. Jan Doe',
    phone: '081-22334455',
    specialist: 'Cardiologist',
  },
]

const PatientPhysician: React.FunctionComponent<any> = ({ info }) => {
  const classes = useStyles({})
  return (
    <div className={classes.root}>
      <Typography
        component='div'
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Avatar className={classes.bigAvatar}>
          <Typography variant='h4' component='span' style={{ color: 'white' }}>
            PH
          </Typography>
        </Avatar>
      </Typography>
      <Typography className={classes.title} color='textSecondary' gutterBottom>
        {_.get(info, 'specialist')}
      </Typography>
      <Typography variant='h5' component='h2'>
        {_.get(info, 'name')}
      </Typography>
      <Typography className={classes.pos} color='textSecondary'>
        {_.get(info, 'phone')}
      </Typography>
    </div>
  )
}

PatientPhysician.defaultProps = {
  info: mockPhysicians[Math.round(Math.random() * (mockPhysicians.length - 1))],
}

export default PatientPhysician
