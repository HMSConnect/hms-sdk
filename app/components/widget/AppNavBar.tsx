import ThemeSelect from '@components/base/ThemeSelect'
import environment from '@environment'
import {
  AppBar,

  createStyles,

  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import * as React from 'react'
import { useSelector } from 'react-redux'


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

export const AppNavBarWithConnector: React.FunctionComponent<any> = ({
  name,
}) => {
  const state = useSelector((state: any) => state.appNavBar)
  return <AppNavBar />
}

const AppNavBar: React.FunctionComponent<any> = () => {
  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          HMS Widget{' '}
          <Typography variant='body1'>V. {environment.codeVersion}</Typography>
        </Typography>
        <ThemeSelect />
      </Toolbar>
    </AppBar>
  )
}

export default AppNavBar
