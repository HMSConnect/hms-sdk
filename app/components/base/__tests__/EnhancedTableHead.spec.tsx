import * as React from 'react'

import { Table } from '@material-ui/core'
import { fireEvent, render } from '@testing-library/react'
import EnhancedTableHead from '../EnhancedTableHead'


describe('<EnhancedTableHead />', () => {
  it('render <EnhancedTableHead />', () => {
    const { findAllByText } = render(
      <Table>
        <EnhancedTableHead
          headCells={[
            {
              align: 'center',
              disablePadding: false,
              id: 'name',
              label: 'Name'
            }
          ]}
        />
      </Table>
    )

    expect(findAllByText('Name')).toBeTruthy()
  })
  it('sortable <EnhancedTableHead />', () => {
    const onRequestSort = jest.fn()

    const { getByText } = render(
      <Table>
        <EnhancedTableHead
          onRequestSort={onRequestSort}
          headCells={[
            {
              align: 'center',
              disablePadding: false,
              id: 'name',
              label: 'Name'
            },
            {
              align: 'center',
              disablePadding: false,
              id: 'age',
              label: 'Age'
            }
          ]}
        />
      </Table>
    )

    fireEvent.click(getByText('Name'))

    expect(onRequestSort).toBeCalled()
  })
})
