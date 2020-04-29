import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles, Theme } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Toolbar, { styles as toolbarStyles } from '../modules/Toolbar'
import AppBar from '../modules/AppBar'

const styles = (theme: Theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
})

const AppAppBar: React.FunctionComponent<any> = ({ classes }) => {
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant='h6'
            underline='none'
            color='inherit'
            className={classes.title}
            href='/premium-themes/onepirate/'
          >
            HMS
          </Link>
          <div className={classes.right}></div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  )
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AppAppBar)
