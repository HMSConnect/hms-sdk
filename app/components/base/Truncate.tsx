import React from 'react'

import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
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

// Truncate.defaultPropTypes = {
//   size: 2,
//   disableBtn: false,
// }
// const FixedHeight = styled.span`
//   overflow: hidden;
//   display: -webkit-box;
//   -webkit-line-clamp: ${props => props.size || 2};
//   -webkit-box-orient: vertical;
// `

export default Truncate
