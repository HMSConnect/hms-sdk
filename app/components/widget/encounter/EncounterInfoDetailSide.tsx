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
      <List>
        <ListItem>
          <ListItemText
            primary={
              _.chain(encounter)
                .get('status')
                .toUpper()
                .value() || 'Unknow'
            }
            secondary='Status'
          />
        </ListItem>
        <Divider component='li' />
        <ListItem>
          <ListItemText
            primary={
              _.get(encounter, 'startDateTime')
                ? moment
                    .default(_.get(encounter, 'startDateTime'))
                    .format(environment.localFormat.dateTime)
                : 'Unknow'
            }
            secondary='Start Time'
          />
        </ListItem>
        <Divider component='li' />
        <ListItem>
          <ListItemText
            primary={
              _.get(encounter, 'endDateTime')
                ? moment
                    .default(_.get(encounter, 'endDateTime'))
                    .format(environment.localFormat.dateTime)
                : 'Unknow'
            }
            secondary='End Time'
          />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText
            primary={_.get(encounter, 'type') || 'Unknow'}
            secondary='Type'
          />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText
            primary={_.get(encounter, 'reason') || 'Unknow'}
            secondary='Reason'
          />
        </ListItem>
      </List>
    </Paper>
  )
}

export default EncounterInfoDetailSide
