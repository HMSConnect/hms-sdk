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
import Truncate from './Truncate'

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
    anchorOriginTopLeftRectangle: {
      top: '10px',
    },
    anchorOriginTopRightRectangle: {
      top: '10px',
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
      // height: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },

    title: {
      flex: '1 1 100%',
    },
  }
})

const ToolbarWithFilter: React.FC<{
  title?: string
  onClickIcon?: (event: any) => void
  Icon?: any
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
        variant='dense'
        className={clsx(classes.root, {
          [classes.highlight]: !option.style,
        })}
        style={option.style}
      >
        <Typography className={classes.title} variant='h6'>
          <Truncate size={1}>{title}</Truncate>
        </Typography>
        <div className={classes.additionInputLayout}>
          {option.additionButton}
        </div>
        {option.isHideIcon ? null : onClickIcon ? (
          <Tooltip title='Filter list'>
            <Badge
              color='secondary'
              badgeContent={filterActive}
              classes={{
                anchorOriginTopLeftRectangle:
                  classes.anchorOriginTopLeftRectangle,
                anchorOriginTopRightRectangle:
                  classes.anchorOriginTopRightRectangle,
              }}
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'top',
              }}
              // className={classes.margin}
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
        ) : (
          Icon
        )}
      </Toolbar>

      {children}
    </>
  )
}

export default ToolbarWithFilter
