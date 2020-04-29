import * as React from 'react'

import AppFooter from '@components/templates/landing/views/AppFooter'
import AppAppBar from '@components/templates/landing/views/AppNavBar'
import Banner from '@components/templates/landing/views/Banner'
import CustomWidget from '@components/templates/landing/views/CustomWidget'
import Installation from '@components/templates/landing/views/Installation'
import Landing from '@components/templates/landing/views/Landing'
import WidgetGallery from '@components/templates/landing/views/WidgetGallery'
import ShowCase from '@components/templates/landing/views/ShowCase'
import Usage from '@components/templates/landing/views/Usage'
import withLandingTheme from '@components/templates/landing/withLandingTheme'

const LandingPage = () => {
  return (
    <>
      <AppAppBar />
      <Landing />
      <Installation />
      <Usage />
      <WidgetGallery />
      <CustomWidget />
      <ShowCase />
      <Banner />
      <AppFooter />
    </>
  )
}

export default withLandingTheme(LandingPage)
