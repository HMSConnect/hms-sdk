import * as React from 'react'
import { Box } from '@material-ui/core'
import Typography from './Typography'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: any
  value: any
}

const TabPanel: React.FunctionComponent<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box p={3}>
        <Typography component='div'>{children}</Typography>
        // </Box>
      )}
    </div>
  )
}

export default TabPanel
