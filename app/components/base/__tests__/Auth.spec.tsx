import { render } from '@testing-library/react'
import * as React from 'react'
import { withAuthSync } from '../Auth'
import AuthService from '@services/AuthService'

interface IStatelessPage<P = {}> extends React.FunctionComponent<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const PageMock: any = (props: any) => {
  console.log('props :', props)
  return (
    <div>
      <p>{props.token}</p>
    </div>
  )
}

describe('<Auth />', () => {
  const redirectFn = jest.fn()
  beforeAll(() => {
    jest.spyOn(AuthService, 'redirect').mockImplementation((params) => {
      redirectFn.call(null)
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('render Auth', async () => {
    const getToken = jest.fn()
    jest
      .spyOn(AuthService, 'assignAuthDataIfApplicable')
      .mockImplementation((params) => {
        getToken.call(null)
        return 'token'
      })
    const Component = withAuthSync(PageMock)
    const { queryByText } = render(<Component />)
    const props = await Component.getInitialProps({
      req: {
        url: '/embedded-widget',
      },
    })
    expect(true).toBeTruthy()
    expect(getToken).toHaveBeenCalled()
    expect(props.token).toBe('token')
  })
})
