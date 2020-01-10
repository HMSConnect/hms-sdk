import * as React from 'react'

import BootstrapWrapper from '@components/init/BootstrapWrapper'
import AllergyIntoleranceCard from '@components/widget/medical-records/AllergyIntoleranceCard'
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

const AllergyIntoleranceCardPage: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  return (
    <BootstrapWrapper dependencies={['allergy_intolerance']}>
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Typography component='div' className={classes.root}>
            <AllergyIntoleranceCard />
          </Typography>
        </Container>
      </>
    </BootstrapWrapper>
  )
}

AllergyIntoleranceCardPage.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default AllergyIntoleranceCardPage
