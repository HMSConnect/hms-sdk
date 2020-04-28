import React from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '../modules/Typography'
import Button from '../modules/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      overflow: 'hidden',
    },
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(15),
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      marginBottom: theme.spacing(1),
      fontSize: 30,
    },
    image: {
      height: 55,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  }),
)

const Banner: React.FunctionComponent<any> = (props) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant='h5'
          marked='center'
          className={classes.title}
          component='h2'
        >
          <b>SFHIR BDMS</b>
        </Typography>
        <Typography
          variant='h5'
          marked='center'
          component='h2'
        >
          Greenline Synergy
        </Typography>
      </Container>
    </section>
  )
}

export default Banner
