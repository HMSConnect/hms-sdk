import { ThemeProvider } from '@material-ui/styles'
import { render } from '@testing-library/react'
import theme from '../../../src/theme'
import SideMenuWithContent from '../SideMenuWithContent'

import SideMenuMockList from '../__mocks__/SideMenuWithContent'

describe('<SideMenuWithContent />', () => {
  it('render SideMenuWithContent', () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <SideMenuWithContent renderMenuList={<SideMenuMockList />} />
      </ThemeProvider>,
    )

    expect(queryByText('test 1')).toBeTruthy()
  })

  //   it('handle drawner SideMenuWithContent', async () => {
  //     const {
  //       queryByText,
  //       getByText,
  //       findByText,
  //       container,
  //       getByTestId,
  //       getByLabelText,
  //       queryByTestId,
  //     } = render(
  //       <ThemeProvider theme={theme}>
  //         <SideMenuWithContent
  //           renderMenuList={<SideMenuMockList />}
  //           menuTitle='Test Title'
  //         />
  //       </ThemeProvider>,
  //     )

  //     const gg = getByTestId('Drawer')
  //     // act(() => {
  //     //   fireEvent.click(getByText('Test Title'))
  //     // })

  //     // const greetingTextNode = await waitForElement(
  //     //   () =>
  //     //     {
  //     //       expect(queryByText('test 1')).toBeNull()
  //     //     },
  //     //   { container },
  //     // )
  //   })
})
