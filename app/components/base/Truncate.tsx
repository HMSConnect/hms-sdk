import React from 'react'

import { makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  flexHieght: (props: any) => ({
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: props.size,
    display: '-webkit-box',
    overflow: 'hidden',
  }),
}))

const Truncate: React.FunctionComponent<{
  size?: number
}> = ({ children, size = 2 }) => {
  const classes = useStyles({ size })
  return (
    <Typography variant='body2' className={classes.flexHieght}>
      {children}
    </Typography>
  )
}

export default Truncate
