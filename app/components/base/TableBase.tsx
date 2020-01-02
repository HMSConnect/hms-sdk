import * as React from 'react'

import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Theme,
  Typography
} from '@material-ui/core'
import { blue, grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'

import EnhancedTableHead, { IHeaderCellProps } from './EnhancedTableHead'

const useStyles = makeStyles((theme: Theme) => ({
  circle: {
    backgroundColor: grey[400],
    borderColor: grey[400],
    borderRadius: '50%',
    borderStyle: 'solid',
    textAlign: 'center',
    width: '2em'
  },
  root: {},
  tableGroupRow: {
    backgroundColor: blue[50],
    cursor: 'pointer'
  },
  tableRow: {
    cursor: 'pointer'
  },
  tableWrapper: {
    maxHeight: '60vh',
    overflow: 'auto'
  }
}))

export interface IBodyCellProp {
  align?: 'right' | 'left' | 'center' | undefined
  id: string
  styles?: any
  render?: any
}

export interface ITableCellProp {
  headCell: IHeaderCellProps
  bodyCell: IBodyCellProp
}

const TableBase: React.FunctionComponent<{
  entryList: any[]
  id: string
  tableCells: ITableCellProp[]
  isLoading: boolean
  isMore?: boolean
  size?: 'small' | 'medium' | undefined
  onEntrySelected: (event: React.MouseEvent, selectedEncounter: any) => void
  onLazyLoad?: (event: React.MouseEvent) => void
}> = ({
  entryList,
  id,
  isLoading,
  tableCells,
  isMore,
  size,
  onEntrySelected,
  onLazyLoad
}) => {
  const classes = useStyles()
  const headerCells = _.map(
    tableCells,
    (tableCell: ITableCellProp) => tableCell.headCell
  )

  return (
    <Table stickyHeader size={size}>
      <EnhancedTableHead classes={classes} headCells={headerCells} />
      <TableBody>
        {_.map(entryList, (entryData, index: number) => (
          <TableRowBase
            entryData={entryData}
            index={index}
            tableCells={tableCells}
            onEntrySelected={onEntrySelected}
            key={id + index}
            id={id}
          />
        ))}
      </TableBody>
      {isMore ? (
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={tableCells.length}
              style={{ textAlign: 'center' }}
            >
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={onLazyLoad}
                >
                  <Typography variant='body1'>Load More</Typography>
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  )
}

const TableRowBase: React.FunctionComponent<{
  entryData: any
  id: string
  index: string | number
  tableCells: ITableCellProp[]
  onEntrySelected: (event: React.MouseEvent, entry: any) => void
}> = ({ entryData, id, index, tableCells, onEntrySelected }) => {
  const classes = useStyles()
  return (
    <TableRow
      hover
      key={id + index}
      className={classes.tableRow}
      onClick={(event: React.MouseEvent) => onEntrySelected(event, entryData)}
    >
      {_.map(tableCells, (tabelCell: any, tableIndex: number) => (
        <TableCell
          align={tabelCell.bodyCell.align || 'center'}
          key={id + tabelCell.bodyCell.id + index}
        >
          {tabelCell.bodyCell.render ? (
            tabelCell.bodyCell.render(entryData)
          ) : (
            <Typography variant='body2'>
              {_.get(entryData, tabelCell.bodyCell.id) || 'Unknow'}
            </Typography>
          )}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default TableBase
