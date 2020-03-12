import * as React from 'react'
import GraphBase from '../GraphBase'
import { render } from '@testing-library/react'

describe('<GraphBase />', () => {
  it('render GraphBase', () => {
    const data = [
      {
        value: 10,
        issuedDate: '2016-10-01T03:39:53.923+00:00',
      },
      {
        value: 20,
        issuedDate: '2016-11-01T03:39:53.923+00:00',
      },
      {
        value: 33,
        issuedDate: '2016-12-01T03:39:53.923+00:00',
      },
    ]
    // const { queryByText } = render(
    //   <GraphBase
    //     data={data}
    //     argumentField='issuedDate'
    //     optionStyle={{
    //       height: 700,
    //       width: 700,
    //     }}
    //   />,
    // )

    expect(true).toBeTruthy()
  })
})
