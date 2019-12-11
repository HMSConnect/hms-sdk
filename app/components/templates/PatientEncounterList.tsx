import React from 'react'

import {
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import * as _ from 'lodash'
import * as moment from 'moment'

import environment from '../../config'

const useStyles = makeStyles((theme: Theme) => ({
  inline: {
    display: 'inline'
  },
  line: {
    borderLeft: '2px solid lightgrey',
    height: '100%',
    marginLeft: '0.7em',
    position: 'absolute',
    zIndex: -1
  },
  lineColapse: {
    borderLeft: '2px solid lightgrey',
    height: '100%',
    marginLeft: '1.7em'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  root: {},
  listIcon: {
    color: 'green'
  }
}))

const PatientEncounterList: React.FunctionComponent<{
  entryList: any[]
  onEntrySelected: (event: React.MouseEvent, selectedEncounter: any) => void
}> = ({ entryList, onEntrySelected }) => {
  const classes = useStyles()

  return (
    <List component='nav' aria-labelledby='nested-list-subheader'>
      {_.map(entryList, (entry, index) => (
        <React.Fragment key={'encounterItem' + index}>
          <EncounterListItem data={entry} onEntrySelected={onEntrySelected} />
          <Divider variant='inset' />
        </React.Fragment>
      ))}
    </List>
  )
}

export default PatientEncounterList

const EncounterListItem: React.FunctionComponent<{
  data: any
  onEntrySelected: (event: React.MouseEvent, selectedEncounter: any) => void
}> = ({ data, onEntrySelected }) => {
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  const classes = useStyles()
  return (
    <>
      <ListItem button onClick={handleClick}>
        <div className={classes.line}></div>
        <ListItemIcon>
          <FiberManualRecordIcon className={classes.listIcon} />
        </ListItemIcon>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textPrimary'
              >
                {moment
                  .default(data.startTime)
                  .format(environment.localFormat.dateTime)}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component='span'
                variant='h5'
                className={classes.inline}
                color='textPrimary'
              >
                {_.get(data, 'serviceProvider.name') || 'Unknow'}
              </Typography>{' '}
              <br />
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textPrimary'
              >
                {_.get(data, 'participant[0].name') || 'Unknow'}
              </Typography>
            </React.Fragment>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <Grid container>
          <Grid item xs={1}>
            <div className={classes.lineColapse}></div>
          </Grid>
          <Grid item xs={10}>
            <List component='div'>
              <ListItem
                button
                className={classes.nested}
                onClick={event => onEntrySelected(event, data)}
              >
                <ListItemText
                  primary={
                    <>
                      <Typography>
                        <strong>ประเภทการรักษา:</strong>{' '}
                        {_.get(data, 'type') || 'Unknow'}
                      </Typography>
                      <Typography>
                        <strong>ผลการวินิจฉัย:</strong>{' '}
                      </Typography>
                      <Typography>
                        <strong>Class Code:</strong>{' '}
                        {_.get(data, 'classCode') || 'Unknow'}
                      </Typography>
                      <Typography>
                        <strong>Status:</strong>{' '}
                        {_.get(data, 'status') || 'Unknow'}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}
