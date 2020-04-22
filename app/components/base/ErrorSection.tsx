import { Grid, Typography, makeStyles, Theme } from '@material-ui/core'
import * as React from 'react'
const useStyles = makeStyles((theme: Theme) => {
  return {
    background: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.error.dark
          : theme.palette.error.light,
    },
  }
})
const ErrorSection: React.FunctionComponent<{
  error: Error | string
}> = ({ error }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.background}
    >
      <Grid item>
        <Typography variant='body1'>Something went wrong</Typography>
      </Grid>
      <Grid item>
        <Typography variant='caption'>{error}</Typography>
      </Grid>
    </Grid>
  )
}

export default ErrorSection
