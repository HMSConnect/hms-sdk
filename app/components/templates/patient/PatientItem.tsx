import React from 'react'

import {
  Avatar,
  makeStyles,
  TableCell,
  Theme,
  Typography
} from '@material-ui/core'
import * as _ from 'lodash'
import Highlighter from '../../base/Highlighter'

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
  highlightText: string
  patient: any
}> = ({ highlightText, patient }) => {
  const classes = useStyles()

  return (
    <>
      <TableCell>
        <Avatar variant='rounded' className={classes.avatar}></Avatar>
      </TableCell>
      <TableCell align='center'>
        <Typography>
          <strong>
            <Highlighter
              text={_.get(patient, 'name.given[0]')}
              highlightText={highlightText}
            />{' '}
            <Highlighter
              text={_.get(patient, 'name.family')}
              highlightText={highlightText}
            />
          </strong>
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body2'>
          {_.get(patient, 'gender') || 'Unknow'}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='body2'>
          {_.get(patient, 'birthDate') || 'Unknow'}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='body2'>
          {_.get(patient, 'identifier.id.value') || 'Unknow'}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='body2'>
          {_.get(patient, 'identifier.mr.value') || 'Unknow'}
        </Typography>
      </TableCell>
    </>
  )
}

export default PatientItem
