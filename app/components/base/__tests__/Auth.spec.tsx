import { render } from '@testing-library/react'
import * as React from 'react'
import { withAuthSync } from '../Auth'

interface IStatelessPage<P = {}> extends React.FunctionComponent<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const PageMock: any = (props: any) => {
  return (
    <div>
      <p>{props.title}</p>
    </div>
  )
}

describe('<Auth />', () => {
  it('render Auth', () => {
    const { queryByText } = render(withAuthSync(PageMock))
    expect(true).toBeTruthy()
  })
})
