import * as React from 'react'

import {
  Badge,
  IconButton,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { lighten } from '@material-ui/core/styles'
import FilterListIcon from '@material-ui/icons/FilterList'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
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
}))

const ToolbarWithFilter: React.FC<any> = ({
  onClickIcon,
  children,
  title = 'Toolbar Title',
  Icon = <FilterListIcon />,
  filterActive,
  option = {},
}) => {
  const classes = useStyles()
  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: true,
        })}
      >
        <Typography className={classes.title} variant='h6'>
          {title}
        </Typography>
        <div className={classes.additionInputLayout}>
          {option.additionButton}
        </div>
        <Tooltip title='Filter list'>
          <Badge
            color='secondary'
            badgeContent={filterActive}
            className={classes.margin}
            max={999}
          >
            <IconButton aria-label='filter list' onClick={onClickIcon}>
              {Icon}
            </IconButton>
          </Badge>
        </Tooltip>
      </Toolbar>
      {children}
    </>
  )
}

export default ToolbarWithFilter
