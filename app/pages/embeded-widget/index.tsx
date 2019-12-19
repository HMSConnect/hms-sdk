import React, { useEffect } from 'react'

import { Button, Collapse, Container, createStyles, CssBaseline, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Theme, Typography } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import RefreshIcon from '@material-ui/icons/Refresh'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'

const widgetGroup = [
  {
    child: [
      { label: 'Patient-search', path: 'embeded-widget/patient-search' },
      {
        label: 'Patient-search-bar',
        path: 'embeded-widget/patient-search-bar'
      },
      {
        label: 'Patient-search-result',
        path: 'embeded-widget/patient-search-result'
      }
    ],
    label: 'Patient'
  }
]
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4)
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      maxWidth: 360,
      width: '100%'
    }
  })
)

const WidgetGallery = () => {
  const [selectedWidget, setSelectedWidget] = React.useState(
    widgetGroup[0].child[0]
  )

  const classes = useStyles()
  useEffect(() => {
    window.addEventListener(
      'message',
      event => {
        if (event.origin !== 'http://localhost:3000') {
          return
        }
        if (!event.data.message) {
          return
        }
        const divElement = document.getElementById('show-result')
        if (divElement) {
          divElement.innerHTML =
            '<pre>' + JSON.stringify(event.data, null, 2) + '</pre>'
        }
      },
      false
    )
  }, [])

  const handleChangeWidget = (widget: any) => {
    setSelectedWidget(widget)
  }

  const iframeRef = React.useRef<null | HTMLIFrameElement>(null)
  const handleIFrameBack = (event: React.MouseEvent) => {
    if (iframeRef && iframeRef.current) {
      const iframeObject = iframeRef.current as any
      console.log('iframeObject :', iframeObject.contentWindow);
      if (iframeObject) {
        iframeObject.contentWindow.history.back()
      }
    }
  }
  const handleIFrameNext = (event: React.MouseEvent) => {
    if (iframeRef && iframeRef.current) {
      const iframeObject = iframeRef.current as any
      if (iframeObject) {
        iframeObject.contentWindow.history.forward()
      }
    }
  }
  const handleIFrameRefresh = (event: React.MouseEvent) => {
    if (iframeRef && iframeRef.current) {
      const iframeObject = iframeRef.current as any
      if (iframeObject) {
        iframeObject.contentWindow.location.reload()
      }
    }
  }

  const handleIFrameReset = (event: React.MouseEvent) => {
    setSelectedWidget(prev => {
      const split = _.split(prev.path, '#')
      return {
        ...prev,
        path: split[1] ? split[0] : split[0] + '#reset'
      }
    })
  }
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Typography variant='h4'>WidgetGallery</Typography>
        <br />
        <Grid container>
          <Grid item xs={3}>
            <Paper className={classes.root}>
              <List component='nav' aria-labelledby='nested-list-subheader'>
                {_.map(widgetGroup, (widget, index) => (
                  <WidgetGroupListItem key={index} widget={widget}>
                    <List component='div' disablePadding>
                      {_.map(widget.child, (widgetChild, index) => (
                        <React.Fragment
                          key={'widget ' + widget.label + ' ' + index}
                        >
                          <ListItem
                            selected={
                              selectedWidget.label === widgetChild.label
                            }
                            button
                            onClick={() => handleChangeWidget(widgetChild)}
                            className={classes.nested}
                          >
                            <ListItemText primary={widgetChild.label} />
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </WidgetGroupListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <IconButton aria-label='delete' onClick={handleIFrameBack}>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton aria-label='delete' onClick={handleIFrameNext}>
              <NavigateNextIcon />
            </IconButton>
            <IconButton aria-label='delete' onClick={handleIFrameRefresh}>
              <RefreshIcon />
            </IconButton>
            <Button
              onClick={handleIFrameReset}
              color='primary'
              variant='contained'
            >
              {' '}
              Reset
            </Button>
            <iframe
              src={`http://localhost:3000/${selectedWidget.path}`}
              width='1024'
              height='720'
              ref={iframeRef}
            ></iframe>
          </Grid>
        </Grid>
        <div>
          <Typography variant='h6'>Event response</Typography>
          <div id='show-result'></div>
        </div>
      </Container>
    </>
  )
}

const WidgetGroupListItem: React.FunctionComponent<{
  widget: any
}> = ({ widget, children }) => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={widget.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Divider />
      <Collapse in={open} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    </React.Fragment>
  )
}

export default WidgetGallery
