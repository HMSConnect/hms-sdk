import * as React from 'react'

import environment from '@environment'
import {
  Avatar,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import * as _ from 'lodash'
import * as moment from 'moment'

const useStyles = makeStyles((theme: Theme) => ({
  iconAvatar: {
    height: 50,
    margin: 10,
    width: 50,
    zIndex: 300,
  },
  inline: {
    display: 'inline',
    textAlign: 'right',
  },
  line: {
    borderLeft: '10px solid lightgrey',
    height: '100%',
    marginLeft: '6.7rem',
    // left: '10%',
    position: 'absolute',
    zIndex: 100,
  },
  lineColapse: {
    borderLeft: '10px solid lightgrey',
    height: '100%',
    marginLeft: '7.7rem',
  },
  listIcon: {
    color: 'green',
    zIndex: 200,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {},
}))

const PatientEncounterList: React.FunctionComponent<{
  entryList: any[]
  onEntrySelected: (event: React.MouseEvent, selectedEncounter: any) => void
  selectedEncounterId?: any
  isLoading?: boolean
  isMore?: boolean
  onLazyLoad?: (event: any, type?: string) => void
}> = ({
  entryList,
  onEntrySelected,
  isLoading,
  isMore,
  onLazyLoad,
  selectedEncounterId,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    _.findIndex(entryList, { id: selectedEncounterId }),
  )

  React.useEffect(() => {
    const activeIndex = _.findIndex(entryList, {
      id: selectedEncounterId,
    })
    if (activeIndex >= 0) {
      setSelectedIndex(activeIndex)
    }
  }, [entryList])
  const handleEncounterSelected = (
    event: React.MouseEvent,
    selectedEncounter: any,
    index: number,
  ) => {
    setSelectedIndex(index)
    onEntrySelected(event, selectedEncounter)
  }
  return (
    <>
      <List component='nav' aria-labelledby='nested-list-subheader'>
        {_.map(entryList, (entry, index) => (
          <React.Fragment key={'encounterItem' + index}>
            <EncounterListItem
              data={entry}
              onEntrySelected={handleEncounterSelected}
              index={index}
              selectedIndex={selectedIndex}
            />
            <Divider />
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
  selectedIndex: number
  index: number
  onEntrySelected: (
    event: React.MouseEvent,
    selectedEncounter: any,
    index: number,
  ) => void
}> = ({ data, onEntrySelected, index, selectedIndex }) => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  const classes = useStyles()

  const renderIcon = (index?: number) => {
    let randomMath = 0
    if (index) {
      randomMath = index % 3
    }
    const setIcon = [
      'fas fa-clinic-medical',
      'fas fa-hospital',
      'fas fa-hospital-alt',
    ]
    return (
      <Avatar className={classes.iconAvatar}>
        <Icon
          className={setIcon[randomMath]}
          style={{ width: '1.5em', textAlign: 'center' }}
        />
      </Avatar>
    )
  }
  return (
    <>
      <ListItem button onClick={handleClick} selected={selectedIndex === index}>
        <div className={classes.line}></div>
        <ListItemIcon>
          <>
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'
              style={{
                alignItems: 'center',
                display: 'flex',
                // backgroundColor: 'lightblue',
                justifyContent: 'center',
                width: '150%',
              }}
            >
              {moment
                .default(_.get(data, 'startTime'))
                .format(environment.localFormat.date)}
              <br />
              {moment
                .default(_.get(data, 'startTime'))
                .format(environment.localFormat.time)}
            </Typography>
            {renderIcon(index)}
          </>
        </ListItemIcon>
        <ListItemText
          secondary={
            <>
              <Typography
                component='span'
                variant='h6'
                className={classes.inline}
                color='textPrimary'
              >
                {_.get(data, 'organization.display') || 'Unknow'}
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
            </>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            edge='end'
            aria-label='comments'
            onClick={event => onEntrySelected(event, data, index)}
          >
            <CommentIcon />
          </IconButton>
          <IconButton edge='end' aria-label='show all' onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div className={classes.lineColapse}></div>
          </div>
          <div style={{ flex: 10 }}>
            <List component='div'>
              <ListItem
                button
                className={classes.nested}
                onClick={event => onEntrySelected(event, data, index)}
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
          </div>
        </div>
      </Collapse>
    </>
  )
}
