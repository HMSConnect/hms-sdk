import React, { useEffect, useState } from 'react'

import { TablePagination } from '@material-ui/core'

export interface PageOptionResult {
  offset: number
  page: number
  max: number
}

const Pagination: React.FunctionComponent<{
  totalCount: number
  page: number
  max?: number
  onPageChange: (pageOptionResult: PageOptionResult) => void
}> = ({ totalCount, page, max: _max, onPageChange }) => {
  const [max, setMax] = useState(_max ? _max : 10)

  useEffect(() => {
    setMax(_max ? _max : 10)
  }, [_max])

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newMax = parseInt(event.target.value, 10)
    setMax(newMax)
    handlePageChange(0, newMax)
  }

  const handlePageChange = (newPage: number, newMax: number) => {
    onPageChange({
      max: newMax,
      offset: newPage * newMax,
      page: newPage,
    })
  }

  return (
    <TablePagination
      component='div'
      rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
      colSpan={3}
      count={totalCount}
      rowsPerPage={max}
      page={page}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
        native: true
      }}
      onChangePage={(event, newPage) => handlePageChange(newPage, max)}
      onChangeRowsPerPage={handleRowsPerPageChange}
    />
  )
}

export default Pagination
