import * as React from 'react'

import environment from '@environment'
import {
  Button,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import * as _ from 'lodash'
import * as moment from 'moment'

const useStyles = makeStyles((theme: Theme) => ({
  inline: {
    display: 'inline',
  },
  line: {
    borderLeft: '2px solid lightgrey',
    height: '100%',
    marginLeft: '0.7em',
    position: 'absolute',
    zIndex: 1000,
  },
  lineColapse: {
    borderLeft: '2px solid lightgrey',
    height: '100%',
    marginLeft: '1.7rem',
  },
  listIcon: {
    color: 'green',
    zIndex: 2000,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {},
}))

const PatientEncounterList: React.FunctionComponent<{
  entryList: any[]
  onEntrySelected: (event: React.MouseEvent, selectedEncounter: any) => void
  isLoading?: boolean
  isMore?: boolean
  onLazyLoad?: (event: any, type?: string) => void
}> = ({ entryList, onEntrySelected, isLoading, isMore, onLazyLoad }) => {
  return (
    <>
      <List component='nav' aria-labelledby='nested-list-subheader'>
        {_.map(entryList, (entry, index) => (
          <React.Fragment key={'encounterItem' + index}>
            <EncounterListItem data={entry} onEntrySelected={onEntrySelected} />
            <Divider variant='inset' />
          </React.Fragment>
        ))}
        {isMore ? (
          <ListItem style={{ textAlign: 'center' }}>
            {isLoading ? (
              <ListItemText style={{ textAlign: 'center' }}>
                <CircularProgress />
              </ListItemText>
            ) : onLazyLoad ? (
              <ListItemSecondaryAction>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={onLazyLoad}
                >
                  <Typography variant='body1'>Load More</Typography>
                </Button>
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        ) : null}
      </List>
    </>
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
                  .default(_.get(data, 'startTime'))
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
                        {_.get(data, 'reason') || 'Unknow'}
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
