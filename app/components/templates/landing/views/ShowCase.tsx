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
import { Link, Card, Paper } from '@material-ui/core'

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
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
    },
    title: {
      marginBottom: theme.spacing(10),
    },
    number: {
      fontSize: 24,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    image: {
      height: 55,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    curvyLines: {
      pointerEvents: 'none',
      position: 'absolute',
      top: -180,
      opacity: 0.7,
    },
    button: {
      marginTop: theme.spacing(8),
    },
  }),
)

const ShowCase: React.FunctionComponent<any> = (props) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant='h4'
          marked='center'
          className={classes.title}
          component='h2'
        >
          <b>ShowCase</b>
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={12}>
              <Typography variant='h5' align='center'>
                <Link
                  href={`/embedded-widget?widget=patient-summary`}
                  color='inherit'
                >
                  Patient Summary
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={12}>
              <Typography variant='body1' align='left'>
                Patient Summary, widget include all patient's information
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Paper elevation={3}>
                <div className={classes.item}>
                  <img
                    src='../../../../static/images/patientSummary.png'
                    alt='suitcase'
                    className={classes.image}
                    style={{ height: '100%', width: '100%' }}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  )
}

export default ShowCase
