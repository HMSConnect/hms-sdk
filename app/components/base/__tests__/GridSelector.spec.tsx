import * as React from 'react'

import { fireEvent, render, wait } from '@testing-library/react'
import { DefaultContentMock } from '../__mocks__/GridCardSelectorMock'
import GridSelector, { saveLayout } from '../GridSelector'

describe('<GridSelector /> ', () => {
  it('render <GridSelector />', () => {
    const { getByTestId } = render(
      <GridSelector componentResource={{ default: DefaultContentMock }} />,
    )

    expect(getByTestId('grid-selector')).toBeTruthy()
  })

  it('should save localStorage when change grid select option ', () => {
    const { getByText } = render(
      <GridSelector componentResource={{ default: DefaultContentMock }} />,
    )
    fireEvent.click(getByText('1xN')) // default selection option
    fireEvent.click(getByText('2xN'))

    wait(
      () => {
        expect(localStorage.getItem('medicalPanelRecord')).toContain('2xN')
      },
      { timeout: 500 },
    )
  })

  it('should save layout correct', () => {
    saveLayout({}, '2xN')

    wait(
      () => {
        expect(localStorage.getItem('medicalPanelRecord')).toContain('2xN')
      },
      { timeout: 600 },
    )
  })

  it('should select component correct when click add icon', () => {
    const { getAllByTestId, getByText } = render(
      <GridSelector componentResource={{ default: DefaultContentMock }} />,
    )

    fireEvent.click(getAllByTestId('add-icon-button')[0]) // click icon add
    fireEvent.click(getByText('Default')) // click component in default

    expect(getByText('test')).toBeTruthy() // will show content in default component
  })

  it('should restoreLayout correct', () => {
    localStorage.setItem(
      'medicalPanelRecord',
      JSON.stringify({
        dimention: '3x3',
        layout: [
          {
            componentName: 'default',
            i: 'grid-1',
            h: 2,
            w: 3,
            x: 0,
            y: 0,
          },
        ],
      }),
    )
    const { getByText } = render(
      <GridSelector componentResource={{ default: DefaultContentMock }} />,
    )

    expect(getByText('3x3')).toBeTruthy()
    expect(getByText('test')).toBeTruthy() // will show content in default component
  })
})
