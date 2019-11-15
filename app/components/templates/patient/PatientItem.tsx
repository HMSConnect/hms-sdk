import React from 'react'

import {
  Avatar,
  makeStyles,
  TableCell,
  Theme,
  Typography
} from '@material-ui/core'
import * as _ from 'lodash'
import Patient from '../../../models/Patient'

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    marginRight: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  root: {}
}))
const PatientItem: React.FunctionComponent<{
  patient: Patient
}> = ({ patient }) => {
  const classes = useStyles()
  return (
    <>
      <TableCell>
        <Avatar variant='rounded' className={classes.avatar}></Avatar>
      </TableCell>
      <TableCell align='center'>
        <Typography>
          <strong>
            {_.get(patient, 'name.given[0]') || 'Unknow'}{' '}
            {_.get(patient, 'name.family') || 'Unknow'}{' '}
          </strong>
        </Typography>
      </TableCell>
      <TableCell>{_.get(patient, 'gender') || 'Unknow'}</TableCell>
      <TableCell align='center'>
        {_.get(patient, 'birthDate') || 'Unknow'}
      </TableCell>
      <TableCell align='center'>
        {_.get(patient, 'identifier.id.value') || 'Unknow'}
      </TableCell>
      <TableCell align='center'>
        {_.get(patient, 'identifier.mr.value') || 'Unknow'}
      </TableCell>
    </>
  )
}

export default PatientItem
