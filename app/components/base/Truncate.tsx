import React from 'react'

import { makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  flexHieght: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    overflow: 'hidden',
  },
}))
const Truncate: React.FunctionComponent<any> = ({ children, size }) => {
  const classes = useStyles()
  return (
    <Typography variant='body2' className={classes.flexHieght}>
      {children}
    </Typography>
  )
}

export default Truncate
