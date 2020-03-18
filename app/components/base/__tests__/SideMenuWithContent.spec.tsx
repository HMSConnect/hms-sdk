import * as React from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import theme from '../../../src/theme'
import SideMenuMockList from '../__mocks__/SideMenuWithContent'
import SideMenuWithContent from '../SideMenuWithContent'

describe('<SideMenuWithContent />', () => {
  it('render SideMenuWithContent', () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <SideMenuWithContent
          renderMenuList={<SideMenuMockList />}
          menuTitle='Test Title'
        />
      </ThemeProvider>,
    )

    expect(queryByText('Test Title')).toBeTruthy()
  })
  it('render without menuTitle SideMenuWithContent', () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <SideMenuWithContent renderMenuList={<SideMenuMockList />} />
      </ThemeProvider>,
    )

    expect(queryByText('Menu')).toBeTruthy()
  })

  it('open/close SideMenuWithContent', async () => {
    const { queryByText, getByText, getByLabelText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <SideMenuWithContent
          renderMenuList={<SideMenuMockList />}
          menuTitle='Test Title'
        />
      </ThemeProvider>,
    )

    expect(queryByText('Test Title')).toBeTruthy()

    const titleElement = getByText('Test Title')
    fireEvent.click(titleElement)

    await waitForDomChange({ container: getByTestId('drawer') })

    const newContainers = getByTestId('drawer').lastElementChild
    const contaimserStyle = window.getComputedStyle(
      newContainers as HTMLElement,
    )
    expect(contaimserStyle.visibility).toBe('hidden')

    const iconOpenDrawer = getByLabelText('open drawer')

    fireEvent.click(iconOpenDrawer)

    // await waitForDomChange({ container: getByTestId('drawer') })
    const newContainers1 = getByTestId('drawer').lastElementChild
    const contaimserStyle1 = window.getComputedStyle(
      newContainers1 as HTMLElement,
    )
    expect(contaimserStyle1.visibility).toBe('')
    expect(contaimserStyle1.transform).toBe('none')
  })
})
