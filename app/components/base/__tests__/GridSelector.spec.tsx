import * as React from 'react'

import { render, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GridSelector, { saveLayout } from '../GridSelector'
import { DefaultContentMock } from '../__mocks__/GridCardSelectorMock'


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
    userEvent.click(getByText('1xN')) // default selection option
    userEvent.click(getByText('2xN'))

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

  // it('should select component correct when click add icon', async () => {
  //   const { getAllByTestId, getByText, getAllByText } = render(
  //     <GridSelector componentResource={{ default: DefaultContentMock }} />,
  //   )

  //   userEvent.click(getAllByTestId('add-icon-button')[0]) // click icon add
  //   await waitForDomChange()
  //   userEvent.click(getByText('Default')) // click component in default

  //   expect(getAllByText('test')).toBeTruthy() // will show content in default component
  // })

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
    const { getByText, getAllByText } = render(
      <GridSelector componentResource={{ default: DefaultContentMock }} />,
    )

    expect(getByText('3x3')).toBeTruthy()
    expect(getAllByText('test')).toBeTruthy() // will show content in default component
  })
})
