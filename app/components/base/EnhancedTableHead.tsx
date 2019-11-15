import React from 'react'

import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core'
import * as _ from 'lodash'
interface HeadeCellProps {
  id: string
  disablePadding: boolean // for padding in Tab
  label: string
  align: 'right' | 'left' | 'center'
  styles?: any
  disableSort?: boolean
}

interface EnhancedTableProps {
  classes: any
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void
  order: 'asc' | 'desc'
  orderBy: string
  headCells: HeadeCellProps[]
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { classes, order, orderBy, onRequestSort, headCells } = props
  const createSortHandler = (property: any) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {_.map(headCells, (headCell: HeadeCellProps) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={headCell.styles}
          >
            {headCell.disableSort ? (
              <Typography>{headCell.label}</Typography>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography>{headCell.label}</Typography>
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
