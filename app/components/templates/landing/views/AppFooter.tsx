import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '../modules/Typography'

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color='inherit' href='/patient-search'>
        HMS-widget
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    background: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}))

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
]

export default function AppFooter() {
  const classes = useStyles()

  return (
    <Typography component='footer' className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction='column'
              justify='flex-end'
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a href='https://material-ui.com/' className={classes.icon}>
                  <img
                    src='../../../../static/images/appFooterFacebook.png'
                    alt='Facebook'
                  />
                </a>
                <a
                  href='https://twitter.com/MaterialUI'
                  className={classes.icon}
                >
                  <img
                    src='../../../../static/images/appFooterTwitter.png'
                    alt='Twitter'
                  />
                </a>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={6}>
            <Typography variant='h6' marked='left' gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                {/* <Link href='/premium-themes/onepirate/terms/'>Terms</Link> */}
                Terms
              </li>
              <li className={classes.listItem}>
                {/* <Link href='/premium-themes/onepirate/privacy/'>Privacy</Link> */}
                Privacy
              </li>
            </ul>
          </Grid>
          <Grid item>
            <Typography variant='caption'>
              {'Icons made by '}
              <Link
                href='https://www.freepik.com'
                rel='sponsored'
                title='Freepik'
              >
                Freepik
              </Link>
              {' from '}
              <Link
                href='https://www.flaticon.com'
                rel='sponsored'
                title='Flaticon'
              >
                www.flaticon.com
              </Link>
              {' is licensed by '}
              <Link
                href='https://creativecommons.org/licenses/by/3.0/'
                title='Creative Commons BY 3.0'
                target='_blank'
                rel='noopener noreferrer'
              >
                CC 3.0 BY
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}
