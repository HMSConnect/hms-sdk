import * as React from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { render } from '@testing-library/react'

import theme from '../../../src/theme'
import BreadcrumbsBase, { IBreadcrumbPath } from '../BreadcrumbsBase'

describe('<Breadcrumbs />', () => {
  it('render <Breadcrumbs />', () => {
    const parentPath: IBreadcrumbPath[] = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Patient Search',
        url: '/patient-search',
      },
    ]

    const currentPath = 'Patient Detail'

    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <BreadcrumbsBase parentPath={parentPath} currentPath={currentPath} />
      </ThemeProvider>,
    )

    expect(queryByText('Home')).toBeTruthy()
    expect(queryByText('Patient Search')).toBeTruthy()
    expect(queryByText('Patient Detail')).toBeTruthy()
  })

  // it('test router <Breadcrumbs />', () => {
  //   const parentPath: IBreadcrumbPath[] = [
  //     {
  //       label: 'Home',
  //       url: '/'
  //     },
  //     {
  //       label: 'Patient Search',
  //       url: '/patient-search'
  //     }
  //   ]

  //   const currentPath = 'Patient Detail'

  //   const { getByText, findAllByText } = render(
  //     <ThemeProvider theme={theme}>
  //       <BreadcrumbsBase parentPath={parentPath} currentPath={currentPath} />
  //     </ThemeProvider>
  //   )
  //   fireEvent.click(
  //     getByText(/Home/i),
  //     new MouseEvent('click', {
  //       bubbles: true,
  //       cancelable: true
  //     })
  //   )
  //   expect(findAllByText('patient-search')).toBeTruthy()
  // })
})
