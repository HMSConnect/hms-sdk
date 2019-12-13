import React from 'react'

import {
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography
} from '@material-ui/core'
import * as _ from 'lodash'
import * as moment from 'moment'

import environment from '../../../config'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '1em'
  }
}))
const EncounterInfoDetailSide: React.FunctionComponent<any> = ({
  encounter
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Typography variant='h6'>{encounter.classCode}</Typography>

      <List component='nav' aria-label='main mailbox folders'>
        <ListItem>
          <ListItemText
            primary={
              <>
                <Typography variant='body1'>
                  Status: {_.get(encounter, 'status') || 'Unknow'}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <>
                <Typography variant='body1'>
                  StartTime:{' '}
                  {_.get(encounter, 'startDateTime')
                    ? moment
                        .default(_.get(encounter, 'startDateTime'))
                        .format(environment.localFormat.dateTime)
                    : 'Unknow'}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <>
                <Typography variant='body1'>
                  EndTime:{' '}
                  {_.get(encounter, 'endDateTime')
                    ? moment
                        .default(_.get(encounter, 'endDateTime'))
                        .format(environment.localFormat.dateTime)
                    : 'Unknow'}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <>
                <Typography variant='body1'>
                  Type: {_.get(encounter, 'type') || 'Unknow'}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <>
                <Typography variant='body1'>
                  Reason: {_.get(encounter, 'reason') || 'Unknow'}
                </Typography>
              </>
            }
          />
        </ListItem>
      </List>
    </Paper>
  )
}

export default EncounterInfoDetailSide
