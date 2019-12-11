import React from 'react'

import { fireEvent, render } from '@testing-library/react'

import TabGroup from '../TabGroup'

describe('<TabFroup />', () => {
  it('render <TabFroup />', () => {
    const tabList = [
      { type: 'ADMS', totalCount: 10 },
      { type: 'CCS60', totalCount: 15 }
    ]
    const onChange = jest.fn()
    const { findAllByText } = render(
      <TabGroup tabList={tabList} onTabChange={onChange} />
    )
    expect(findAllByText('ADMS')).toBeTruthy()
    expect(findAllByText('10')).toBeTruthy()
  })

  it('TabChange <TabFroup />', () => {
    const tabList = [
      { type: 'ADMS', totalCount: 10 },
      { type: 'CCS60', totalCount: 15 }
    ]
    const onChange = jest.fn()
    const { findAllByText, getByTestId } = render(
      <TabGroup tabList={tabList} onTabChange={onChange} />
    )

    fireEvent.click(getByTestId('ADMS'))
    expect(onChange).toBeCalled()
  })
})
