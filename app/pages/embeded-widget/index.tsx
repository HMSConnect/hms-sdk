import React, { useEffect } from 'react'

import {
  Button,
  Collapse,
  Container,
  createStyles,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Theme,
  Typography
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import RefreshIcon from '@material-ui/icons/Refresh'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'
import { ObjectInspector } from 'react-inspector'
const widgetGroup = [
  {
    child: [
      {
        label: 'Patient-search-bar',
        path: 'embeded-widget/patient-search-bar'
      },
      { label: 'Patient-search', path: 'embeded-widget/patient-search' },
      {
        label: 'Patient-search-result',
        path: 'embeded-widget/patient-search-result'
      },
      {
        label: 'Patient-info',
        path: 'embeded-widget/patient-info/0debf275-d585-4897-a8eb-25726def1ed5'
      }
    ],
    label: 'Patient'
  }
]
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    code: {
      background: 'rgb(36, 36, 36)',
      borderRadius: 8,
      height: '100%',
      minHeight: '20vh',
      padding: 16
    },
    eventResponse: {
      minHeight: '30vh',
      padding: theme.spacing(2),
      width: '100%'
    },
    iframLayout: {
      display: 'flex',
      minHeight: '70vh'
    },
    iframe: {
      flex: '1 1 auto'
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    root: {},
    widgetGallery: {
      marginBottom: 16
    },
    widgetGalleryHeader: {
      padding: theme.spacing(2)
    },
    widgetGallerySide: {
      backgroundColor: theme.palette.background.paper,
      height: '100%',
      padding: theme.spacing(2),
      width: '100%'
    }
  })
)

const WidgetGallery = () => {
  const classes = useStyles()
  const iframeRef = React.useRef<null | HTMLIFrameElement>(null)
  const [selectedWidget, setSelectedWidget] = React.useState(
    widgetGroup[0].child[0]
  )
  const [outputEventData, setOutputEventData] = React.useState({})

  useEffect(() => {
    window.addEventListener(
      'message',
      event => {
        // if (
        //   event.origin !==
        //   `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}`
        // ) {
        //   return
        // }
        if (!event.data.message) {
          return
        }

        setOutputEventData(event.data)
        // const divElement = document.getElementById('show-result')
        // if (divElement) {
        //   divElement.appendChild()
        //     // '<pre>' + JSON.stringify(event.data, null, 2) + '</pre>'
        // }
      },
      false
    )
  }, [])

  const handleChangeWidget = (widget: any) => {
    setSelectedWidget(widget)
  }

  const handleIFrameBack = (event: React.MouseEvent) => {
    if (iframeRef && iframeRef.current) {
      const iframeObject = iframeRef.current as any
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
    setOutputEventData({})
  }
  const handleIFrameReset = (event: React.MouseEvent) => {
    setSelectedWidget(prev => {
      const split = _.split(prev.path, '#')
      return {
        ...prev,
        path: split[1] ? split[0] : split[0] + '#reset'
      }
    })
    setOutputEventData({})
  }

  return (
    <>
      <CssBaseline />
      <Grid className={classes.root}>
        <Grid container className={classes.widgetGallery}>
          <Grid item xs={3}>
            <Paper className={classes.widgetGallerySide}>
              <Grid className={classes.widgetGalleryHeader}>
                <Grid item xs>
                  <Typography variant='h4'>Widget Gallery</Typography>
                </Grid>
              </Grid>
              <Divider variant='fullWidth' />
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
            <Grid item xs={12}>
              <IconButton aria-label='back' onClick={handleIFrameBack}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton aria-label='next' onClick={handleIFrameNext}>
                <NavigateNextIcon />
              </IconButton>
              <IconButton aria-label='refresh' onClick={handleIFrameRefresh}>
                <RefreshIcon />
              </IconButton>
              <Button
                onClick={handleIFrameReset}
                color='primary'
                variant='contained'
                aria-label='reset'
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.iframLayout}>
              <iframe
                ref={iframeRef}
                className={classes.iframe}
                src={`/${selectedWidget.path}`}
              />
            </Grid>
          </Grid>
        </Grid>
        <Paper className={classes.eventResponse}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h6'>Event Response</Typography>
            </Grid>
            <Grid className={classes.code} xs={12}>
              <ObjectInspector
                data={outputEventData}
                expandLevel={3}
                theme={'chromeDark'}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
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
