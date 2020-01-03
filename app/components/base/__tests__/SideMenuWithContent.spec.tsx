import * as React from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { render } from '@testing-library/react'
import theme from '../../../src/theme'
import SideMenuMockList from '../__mocks__/SideMenuWithContent'
import SideMenuWithContent from '../SideMenuWithContent'

describe('<SideMenuWithContent />', () => {
  it('render SideMenuWithContent', () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <SideMenuWithContent renderMenuList={<SideMenuMockList />} />
      </ThemeProvider>,
    )

    expect(queryByText('test 1')).toBeTruthy()
  })
})
