import React from 'react'

import MuiAppBar from '@material-ui/core/AppBar'
import { Theme, withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.common.white,
  },
})

const AppBar: React.FunctionComponent<any> = (props) => {
  return <MuiAppBar elevation={0} position='static' {...props} />
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AppBar)
