import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) => {
  return {
    background: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette?.loading?.dark
          : theme.palette?.loading?.main,
    },
  }
})

const LoadingSection: React.FunctionComponent<{ label?: string }> = ({
  label,
}) => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={classes.background}
    >
      <Grid>
        <Typography variant='body1' component='p'>
          {label ? label : 'loading..'}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default LoadingSection
