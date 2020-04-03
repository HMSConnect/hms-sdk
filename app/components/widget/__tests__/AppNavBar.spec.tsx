import AuthService from '@services/AuthService'
import { fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import AppNavBar from '../AppNavBar'
import * as useRedux from 'react-redux'

jest.mock('@services/AuthService', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
    logout: jest.fn(),
  },
}))

describe('<AppNavBar />', () => {
  it('render <AppNavBar />', () => {
    const dispatch = jest.spyOn(useRedux, 'useDispatch') as any
    const dispatchFn = jest.fn()
    dispatch.mockImplementation((params: any) => dispatchFn)
    const { queryAllByText } = render(<AppNavBar />)
    expect(queryAllByText('HMS Widget')).toBeTruthy()
  })

  it('logout <AppNavBar />', () => {
    const dispatch = jest.spyOn(useRedux, 'useDispatch') as any
    const dispatchFn = jest.fn()
    dispatch.mockImplementation((params: any) => dispatchFn)
    const { queryAllByText, getByTestId } = render(<AppNavBar />)
    expect(queryAllByText('HMS Widget')).toBeTruthy()
    const logoutButtonElement = getByTestId('logout-app-nav-bar')

    fireEvent.click(logoutButtonElement)
    const logoutMock = AuthService.logout

    expect(logoutMock).toBeCalled()
  })
})
