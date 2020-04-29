import LandingLayout from '@components/templates/landing/views/LandingLayout'
import { Theme, withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '../modules/Typography'
const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80'

const styles = (theme: Theme) => ({
  background: {
    // backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
})

const Landing: React.FunctionComponent<any> = (props) => {
  const { classes } = props

  return (
    <LandingLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt='increase priority'
      />
      <Typography color='inherit' align='center' variant='h2' marked='center'>
        HMS Widget
      </Typography>
      <Typography
        color='inherit'
        align='center'
        variant='h5'
        className={classes.h5}
      >
        Healthcare is easy, anyone can do it
      </Typography>
    </LandingLayout>
  )
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Landing)
