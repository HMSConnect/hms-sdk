import React from 'react'

import {
  Divider,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Theme
} from '@material-ui/core'
import * as _ from 'lodash'
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginRight: theme.spacing(2),
    width: '100%'
  },
  root: {
    display: 'flex'
  },
}))
// TODO click to render information
const PatientMenuList: React.FunctionComponent<{
  datas: any[]
}> = ({ datas }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          {_.map(datas, (data, index) => (
            <div key={index}>
              <MenuItem>{data.label}</MenuItem>
              <Divider />
            </div>
          ))}
        </MenuList>
      </Paper>
    </div>
  )
}
export default PatientMenuList
