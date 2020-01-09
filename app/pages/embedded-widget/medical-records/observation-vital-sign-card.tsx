import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import ObservationVitalSignCard from '@components/widget/medical-records/ObservationVitalSignCard'
import {
  Container,
  CssBaseline,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    paddingTop: '30px',
  },
}))

const ObservationVitalSignCardPage: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  return (
    <BootstrapWrapper dependencies={['observation']}>
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Typography component='div' className={classes.root}>
            <ObservationVitalSignCard />
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

ObservationVitalSignCardPage.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default ObservationVitalSignCardPage
