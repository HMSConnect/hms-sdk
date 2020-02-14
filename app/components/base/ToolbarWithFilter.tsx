import * as React from 'react'

import {
  Badge,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { lighten } from '@material-ui/core/styles'
import FilterListIcon from '@material-ui/icons/FilterList'
import clsx from 'clsx'

interface IToolbarWithFilterOption {
  style?: any
  additionButton?: any
  isHideIcon?: boolean
}
const useStyles = makeStyles((theme: Theme) => {
  return {
    additionInputLayout: {
      flex: '3 3 100%',
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            color: theme.palette.secondary.main,
          }
        : {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.text.primary,
          },
    margin: {
      margin: theme.spacing(1),
    },
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    tableWrapper: {
      maxHeight: '55vh',
      overflow: 'auto',
    },
    title: {
      flex: '1 1 100%',
    },
  }
})

const ToolbarWithFilter: React.FC<{
  title?: string
  onClickIcon?: (event: any) => void
  Icon?: React.Component<any>
  filterActive?: number
  option?: IToolbarWithFilterOption
}> = ({
  onClickIcon,
  children,
  title = 'Toolbar Title',
  Icon = <FilterListIcon />,
  filterActive = 0,
  option = {},
}) => {
  const classes = useStyles()
  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: !option.style,
        })}
        style={option.style}
      >
        <Typography className={classes.title} variant='h6'>
          {title}
        </Typography>
        <div className={classes.additionInputLayout}>
          {option.additionButton}
        </div>
        {option.isHideIcon ? null : (
          <Tooltip title='Filter list'>
            <Badge
              color='secondary'
              badgeContent={filterActive}
              className={classes.margin}
              max={999}
            >
              <IconButton
                data-testid='toolbar-filter-icon'
                aria-label='filter list'
                onClick={onClickIcon}
              >
                {Icon}
              </IconButton>
            </Badge>
          </Tooltip>
        )}
      </Toolbar>

      {children}
    </>
  )
}

export default ToolbarWithFilter
