import * as React from 'react'

import environment from '@environment'
import {
  AppBar,
  Button,
  createStyles,
  Icon,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import AuthService from '@services/AuthService'
import clsx from 'clsx'
import SelectOption from '@components/base/SelectOption'
import ThemeManager from '@app/styles/ThemeManager'
import { useDispatch, useSelector } from 'react-redux'
import { themeChange, themeCustom } from '@app/actions/theme.action'
import ThemeSelect from '@components/base/ThemeSelect'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      paddingRight: theme.spacing(1),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
)
const AppNavBar: React.FunctionComponent<any> = () => {
  const classes = useStyles()

  const handleLogout = (event: any) => {
    AuthService.logout()
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          HMS Widget{' '}
          <Typography variant='body1'>V. {environment.codeVersion}</Typography>
        </Typography>
        <ThemeSelect />
        <div>
          <Button
            onClick={handleLogout}
            color='inherit'
            data-testid='logout-app-nav-bar'
          >
            <Icon className={clsx('fas fa-sign-out-alt', classes.icon)} />{' '}
            <Typography
              style={{ paddingLeft: '8px' }}
              component='span'
              variant='body2'
            >
              Logout
            </Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default AppNavBar
