import React, { ReactElement } from 'react'

import {
  Breadcrumbs as MBreadcrumbs,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import RouteManager from '@routes/RouteManager'
import * as _ from 'lodash'
import routes from '../../routes'

export interface IBreadcrumbPath {
  url?: string
  label?: string
  icon?: ReactElement
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    height: 20,
    marginRight: theme.spacing(0.5),
    width: 20,
  },
  link: {
    display: 'flex',
  },
  root: {
    padding: theme.spacing(1, 2),
  },
}))

const BreadcrumbsBase: React.FunctionComponent<{
  parentPath: IBreadcrumbPath[]
  currentPath: string
  max?: number
}> = ({ parentPath, currentPath, max }) => {
  const classes = useStyles()

  const handleSelect = (path: IBreadcrumbPath) => {
    if (!path.url) {
      routes.Router.back()
    } else {
      const newPath = RouteManager.getPath(path.url)
      routes.Router.pushRoute(newPath)
    }
  }
  return (
    <Paper elevation={0} className={classes.root}>
      <MBreadcrumbs aria-label='breadcrumb'>
        {_.map(parentPath, (parent: IBreadcrumbPath, index: number) => (
          <Link
            key={index}
            color='inherit'
            onClick={(event: React.MouseEvent) => handleSelect(parent)}
            className={classes.link}
            href='#'
          >
            {_.get(parent, 'icon') || null}
            {parent.label || ''}
          </Link>
        ))}
        <Typography color='textPrimary' className={classes.link}>
          {currentPath}
        </Typography>
      </MBreadcrumbs>
    </Paper>
  )
}

export default BreadcrumbsBase
