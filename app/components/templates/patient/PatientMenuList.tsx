import * as _ from 'lodash'

import {
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React from 'react'

export interface IResourceMenu {
  resourceType: string
  data: any
  totalCount: number
}

const useStyles = makeStyles((theme: Theme) => ({
  circle: {
    backgroundColor: grey[400],
    borderColor: grey[400],
    borderRadius: '50%',
    borderStyle: 'solid',
    width: '2em'
  },
  paper: {
    marginRight: theme.spacing(2),
    width: '100%'
  },
  root: {
    display: 'flex'
  },
  tabs: {
    marginRight: theme.spacing(2),
    width: '100%'
  }
}))
const PatientMenuList: React.FunctionComponent<{
  menuList: IResourceMenu[]
  navigate: string
  onNavigateChange: (newNavigate: string) => void
}> = ({ menuList, onNavigateChange, navigate }) => {
  const classes = useStyles()
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    onNavigateChange(newValue)
  }

  return (
    <div className={classes.root}>
      <List
        component='nav'
        aria-label='main mailbox folders'
        className={classes.paper}
      >
        {_.map(menuList, (menu: any) => (
          <div key={menu.resourceType}>
            <Divider />
            <ListItem
              button
              selected={navigate === menu.resourceType}
              onClick={event => handleChange(event, menu.resourceType)}
            >
              <ListItemText primary={_.startCase(menu.resourceType)} />
              <ListItemSecondaryAction className={classes.circle}>
                <div style={{ textAlign: 'center' }}>{menu.totalCount}</div>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  )
}
export default PatientMenuList
