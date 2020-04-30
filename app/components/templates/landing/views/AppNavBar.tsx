import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles, Theme, darken } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Toolbar, { styles as toolbarStyles } from '../modules/Toolbar'
import AppBar from '../modules/AppBar'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useScrollTrigger,
} from '@material-ui/core'
import SideMenuWithContent, {
  SideMenu,
} from '@components/base/SideMenuWithContent'
import * as _ from 'lodash'
import Router from 'next/router'
import MenuIcon from '@material-ui/icons/Menu'
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
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  leftMobile: {
    flex: 1,
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    height: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  rightMobile: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    height: '100%',
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  ul: {
    margin: 0,
    padding: 0,
    lineStyleType: 'none',
  },
  linkItem: {
    padding: '20px 16px',
    height: '100%',
    display: 'block',
    '&:hover': {
      backgroundColor: darken(theme.palette.secondary.main, 0.4),
    },
    cursor: 'pointer',
  },
  headerLink: {
    width: '7em',
    height: '100%',
    display: 'block',
    // textAlign: 'center',
  },
  childLink: {
    fontSize: 18,
  },
  hide: {
    display: 'none',
  },
})

const AppAppBar: React.FunctionComponent<any> = ({ classes, window }) => {
  const [isOpen, setOpen] = React.useState(false)

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    path: string,
  ) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector(path)

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}></div>
          <div className={classes.leftMobile}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, isOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Link
            variant='h4'
            underline='none'
            color='inherit'
            className={clsx(classes.title)}
            href='/landing'
          >
            HMS
          </Link>

          <div className={classes.right}>
            <Typography
              variant='body2'
              className={clsx(
                classes.title,
                classes.linkItem,
                classes.childLink,
              )}
              component='div'
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClick(event, '#installation')
              }
            >
              Install
            </Typography>
            <Typography
              variant='body2'
              className={clsx(
                classes.title,
                classes.linkItem,
                classes.childLink,
              )}
              component='div'
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClick(event, '#usage')
              }
            >
              Usage
            </Typography>
            <Typography
              variant='body2'
              className={clsx(
                classes.title,
                classes.linkItem,
                classes.childLink,
              )}
              component='div'
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClick(event, '#widget-gallery')
              }
            >
              Gallery
            </Typography>
            <Typography
              variant='body2'
              className={clsx(
                classes.title,
                classes.linkItem,
                classes.childLink,
              )}
              component='div'
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClick(event, '#custom-widget')
              }
            >
              Custom
            </Typography>
            <Typography
              variant='body2'
              className={clsx(
                classes.title,
                classes.linkItem,
                classes.childLink,
              )}
              component='div'
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClick(event, '#show-case')
              }
            >
              Case
            </Typography>
          </div>
          <div className={classes.rightMobile}></div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
      <SideMenu
        menuTitle={'App Menu'}
        isOpen={isOpen}
        onDrawerClose={handleDrawerClose}
        aria-label='side-menu'
      >
        <AppBarMenu
          classes={classes}
          onClose={handleDrawerClose}
          onClick={handleClick}
        />
      </SideMenu>
    </div>
  )
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AppAppBar)

const AppBarMenu: React.FunctionComponent<any> = ({
  classes,
  onClose,
  onClick,
}) => {
  return (
    <List component='nav' aria-labelledby='nested-list-subheader'>
      {_.map(menuList, (menu, index) => (
        <React.Fragment key={`menu-${index}`}>
          <Typography
            variant='body2'
            className={clsx(classes.title)}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              onClick(event, menu.path)
            }
            component='div'
          >
            <ListItem button onClick={() => onClose()}>
              <ListItemText primary={menu.label} />
            </ListItem>
          </Typography>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  )
}

const menuList = [
  {
    label: 'Install',
    path: '#installation',
  },
  {
    label: 'Usage',
    path: '#usage',
  },
  {
    label: 'Gallery',
    path: '#widget-gallery',
  },
  {
    label: 'Custom',
    path: '#custom-widget',
  },
  {
    label: 'Case',
    path: '#show-case',
  },
]
