import React from 'react'

import { Table } from '@material-ui/core'
import { fireEvent, render } from '@testing-library/react'
import Pagination from '../Pagination'

describe('<Pagination />', () => {
  it('render <Pagination />', () => {
    const onPageChange = jest.fn()
    const { findAllByText } = render(
      <Pagination totalCount={30} page={0} onPageChange={onPageChange} />
    )

    expect(findAllByText('1')).toBeTruthy()
  })

  it('change Page <Pagination />', () => {
    const onPageChange = jest.fn()
    const { findAllByText, getByTestId, rerender } = render(
      <Pagination totalCount={30} page={0} onPageChange={onPageChange} />
    )

    expect(findAllByText('1')).toBeTruthy()

    fireEvent.click(getByTestId('nextPage'))

    expect(onPageChange).toBeCalled()

    expect(onPageChange.mock.calls[0][0].page).toBe(1)
    rerender(
      <Pagination totalCount={30} page={1} onPageChange={onPageChange} />
    )
    fireEvent.click(getByTestId('prevPage'))

    expect(onPageChange.mock.calls.length).toBe(2)

    expect(onPageChange.mock.calls[1][0].page).toBe(0)
  })

  it('change Max <Pagination />', () => {
    const page = 0
    const onPageChange = jest.fn()
    const { getByText, getByTestId } = render(
      <Pagination totalCount={30} page={page} onPageChange={onPageChange} />
    )
    const selectElemect = getByTestId('pagination').getElementsByTagName(
      'select'
    )
    fireEvent.change(selectElemect[0], { target: { value: 25 } })

    expect(onPageChange).toBeCalled()

    expect(onPageChange.mock.calls[0][0].max).toBe(25)
  })
})
