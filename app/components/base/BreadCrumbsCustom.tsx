import React, { ReactElement } from 'react'

import { Breadcrumbs, Link, Paper, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
interface BreadCrumbPath {
  label: string
  url: string | null
  icon?: ReactElement
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    height: 20,
    marginRight: theme.spacing(0.5),
    width: 20
  },
  link: {
    display: 'flex'
  },
  root: {
    padding: theme.spacing(1, 2)
  }
}))

const BreadCrumbsCustom: React.FunctionComponent<{
  parentPath: BreadCrumbPath[]
  currentPath: string
  max?: number
}> = ({ parentPath, currentPath, max }) => {
  const classes = useStyles()
  const router = useRouter()

  const handleSelect = (path: BreadCrumbPath) => {
    if (!path.url) {
      router.back()
    } else {
      router.push({
        pathname: path.url
      })
    }
  }
  return (
    <Paper elevation={0} className={classes.root}>
      <Breadcrumbs aria-label='breadcrumb'>
        {_.map(parentPath, (parent: BreadCrumbPath, index: number) => (
          <Link
            key={index}
            color='inherit'
            onClick={(event: React.MouseEvent) => handleSelect(parent)}
            className={classes.link}
          >
            {_.get(parent, 'icon') || null}
            {parent.label}
          </Link>
        ))}
        <Typography color='textPrimary' className={classes.link}>
          {currentPath}
        </Typography>
      </Breadcrumbs>
    </Paper>
  )
}

export default BreadCrumbsCustom
