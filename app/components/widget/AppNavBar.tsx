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
import { useDispatch } from 'react-redux'
import { themeChange, themeCustom } from '@app/actions/theme.action'

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
  const [theme, setTheme] = React.useState<string>(
    ThemeManager.getDefaultTheme(),
  )
  const dispath = useDispatch()

  const classes = useStyles()

  const handleLogout = (event: any) => {
    AuthService.logout()
  }
  const onThemeChange = (value: any) => {
    const name = value
    if (value === 'custom') {
      dispath(
        themeCustom(
          {
            palette: {
              nonary: { main: '#00bfa5' },
              primary: { main: '#03a9f4' },
              secondary: { main: '#00bfa5' },
            },
          },
          'dark',
        ),
      )
    } else {
      dispath(themeChange(name))
    }
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          HMS Widget{' '}
          <Typography variant='body1'>V. {environment.codeVersion}</Typography>
        </Typography>
        <SelectOption
          label='Theme'
          labelId='theme-select-label'
          id='theme-select'
          value={theme}
          options={[
            { value: 'normal', label: 'Normal' },
            { value: 'dark', label: 'Dark' },
            { value: 'invert', label: 'Invert' },
            { value: 'custom', label: 'Custom' },
          ]}
          onChange={(
            event: React.ChangeEvent<{ name?: string; value: unknown }>,
          ) => {
            onThemeChange(event.target.value)
          }}
        ></SelectOption>
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
