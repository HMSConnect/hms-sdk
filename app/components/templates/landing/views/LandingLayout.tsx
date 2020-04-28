import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    container: {
      marginTop: theme.spacing(30),
      marginBottom: theme.spacing(14),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    backdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.5,
      zIndex: -1,
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: -2,
    },
    arrowDown: {
      position: 'absolute',
      bottom: theme.spacing(4),
    },
  }),
)

const LandingLayout: React.FunctionComponent<any> = (props) => {
  const classes = useStyles()
  const { backgroundClassName, children } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/* <img
          src='/static/themes/onepirate/productHeroWonder.png'
          alt='wonder'
          width='147'
          height='80'
        /> */}
        {children}
        <div className={classes.backdrop} />
        <div className={clsx(classes.background, backgroundClassName)} />
        {/* <img
          className={classes.arrowDown}
          src='/static/themes/onepirate/productHeroArrowDown.png'
          height='16'
          width='12'
          alt='arrow down'
        /> */}
      </Container>
    </section>
  )
}

export default LandingLayout
