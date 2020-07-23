import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import Login from '@components/widget/Login'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) => ({
  body: {},
  root: {
    height: '100vh',
  },
}))

export interface IStatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const LoginPage: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component='div' className={classes.root}>
        <Login />
      </Typography>
    </React.Fragment>
  )
}

LoginPage.getInitialProps = async (ctx: any) => {
  return {
    query: ctx.query,
  }
}

export default withAuthSync(LoginPage)
// export default LoginPage
