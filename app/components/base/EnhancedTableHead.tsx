import React from 'react'

import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core'
import * as _ from 'lodash'
export interface IHeaderCellProps {
  id: string
  disablePadding: boolean // for padding in Tab
  label: string
  align: 'right' | 'left' | 'center'
  styles?: any
  disableSort?: boolean
}

export interface IEnhancedTableProps {
  classes: any
  headCells: IHeaderCellProps[]
  order?: 'asc' | 'desc'
  orderBy?: string
  onRequestSort?: (property: any) => void
}

const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
  headCells
}: IEnhancedTableProps) => {
  const createSortHandler = (property: any) => {
    if (onRequestSort) {
      onRequestSort(property)
    }
  }

  return (
    <TableHead>
      <TableRow>
        {_.map(headCells, (headCell: IHeaderCellProps) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={headCell.styles}
          >
            {headCell.disableSort ? (
              <Typography variant='h6'>{headCell.label}</Typography>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={() => createSortHandler(headCell.id)}
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
