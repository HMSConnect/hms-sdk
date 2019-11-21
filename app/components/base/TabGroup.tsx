import React from 'react'

import { AppBar, Badge, makeStyles, Tab, Tabs, Theme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import * as _ from 'lodash'


export interface ITabList {
  type: string
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
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    width: '100%'
  }
}))
function a11yProps(index: number) {
  return {
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
    id: `scrollable-auto-tab-${index}`
  }
}

const TabGroup: React.FunctionComponent<{
  tabList: ITabList[]
  onTabChange: (selectedValue: string) => void
}> = ({ tabList, onTabChange }) => {
  const classes = useStyles()
  const [navigate, setNavigate] = React.useState<string>(tabList[0].type)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    onTabChange(newValue)
    setNavigate(newValue)
  }
  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={navigate}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          {_.map(tabList, (tab: any, index: number) => (
            <Tab
              label={
                <Badge
                  color='primary'
                  badgeContent={tab.totalCount}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {tab.type}
                </Badge>
              }
              {...a11yProps(index)}
              value={tab.type}
              key={tab.type + index}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  )
}
export default TabGroup
