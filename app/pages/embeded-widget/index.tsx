import React, { useEffect } from 'react'

import {
  AppBar,
  Box,
  Button,
  Collapse,
  createStyles,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
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
import MarkdownIt from 'markdown-it'
import { ObjectInspector } from 'react-inspector'

import environment from '../../config'
import routes from '../../routes'
import { IStatelessPage } from './patient-search'

const md = MarkdownIt({ html: true })

interface IPostMessage {
  action?: string
  message?: string
  path?: string
  params?: any
  result?: any
  error?: any
}

interface IWidgetGroup {
  label: string
  child: IWidgetChild[]
  value: string
}

interface IWidgetChild {
  label: string
  value: string
  document?: string
  path?: string
}
const widgetGroup: IWidgetGroup[] = [
  {
    child: [
      {
        document: require('../../assets/embedded-widget/get-started.md')
          .default,
        label: 'Get Started',
        value: 'get-started'
      }
    ],
    label: 'Get Started',
    value: 'get-started'
  },
  {
    child: [
      {
        document: require('../../assets/embedded-widget/patient-search.md')
          .default,
        label: 'Patient Search',
        path: 'embeded-widget/patient-search',
        value: 'patient-search'
      },
      {
        document: require('../../assets/embedded-widget/patient-search-bar.md')
          .default,
        label: 'Patient Search Bar',
        path: 'embeded-widget/patient-search-bar',
        value: 'patient-search-bar'
      },
      {
        document: require('../../assets/embedded-widget/patient-search-result.md')
          .default,
        label: 'Patient Search Result',
        path: 'embeded-widget/patient-search-result',
        value: 'patient-search-result'
      },
      {
        document: require('../../assets/embedded-widget/patient-info.md')
          .default,
        label: 'Patient Info',
        path:
          'embeded-widget/patient-info/0debf275-d585-4897-a8eb-25726def1ed5',
        value: 'patient-info'
      },
      {
        document: require('../../assets/embedded-widget/patient-encounter-timeline.md')
          .default,
        label: 'Patine Encounter Timeline',
        path:
          'embeded-widget/patient-info/encounter-timeline/0debf275-d585-4897-a8eb-25726def1ed5',
        value: 'patient-encounter-timeline'
      }
    ],
    label: 'Patient',
    value: 'patient'
  }
]

export const sendMessage = (message: IPostMessage) => {
  window.parent.postMessage(
    {
      ...message,
      eventType: 'embedded-widget'
    },
    environment.iframe.targetOrigin
  )
}

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

const WidgetGallery: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  const iframeRef = React.useRef<null | HTMLIFrameElement>(null)
  const [
    selectedWidget,
    setSelectedWidget
  ] = React.useState<IWidgetChild | null>(null)
  const [outputEventData, setOutputEventData] = React.useState({}) // for event response

  const [widgetURL, setWidgetURL] = React.useState<string | undefined>('') // url for iframe
  const [URLText, setURLText] = React.useState<string | undefined>('') //  for text input
  const [loading, setLoading] = React.useState(true)
  const [tabState, setTabState] = React.useState(0) // for change tab state 0 is Playground, 1 is document

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
        if (event.data.eventType !== 'embedded-widget') {
          return
        }
        console.info('Event Response :', event.data)
        setOutputEventData(event.data)
        if (event.data.path) {
          setURLText(event.data.path)
        }
        // setWidgetURL(event.data.path)
      },
      false
    )
    setLoading(false)

    return () => {
      console.info('unregister iframe :')
      // iframeRef.current = null
    }
  }, [])

  useEffect(() => {
    if (query) {
      setLoading(true)
      const findWidget = _.chain(widgetGroup)
        .map(widget => widget.child)
        .flatten()
        .find(
          (widget: any) => _.toLower(widget.value) === _.toLower(query.widget)
        )
        .value()
      setTabState(findWidget && findWidget.path ? 0 : 1)
      if (findWidget) {
        setSelectedWidget(findWidget)
        setWidgetURL(_.get(findWidget, 'path'))
        setURLText(_.get(findWidget, 'path'))
      } else {
        setSelectedWidget(widgetGroup[0].child[0])
        setWidgetURL(widgetGroup[0].child[0].path)
        setURLText(widgetGroup[0].child[0].path)
      }
      setLoading(false)
    }
  }, [query])

  const iframeInitial = () => {
    const iframeObject = _.get(iframeRef, 'current')
      ? (_.get(iframeRef, 'current') as HTMLIFrameElement)
      : null
    if (iframeObject && iframeObject.contentWindow) {
      iframeObject.contentWindow.onpopstate = (event: any) => {
        setURLText(event.state.url)
      }
    }
  }

  const handleChangeWidget = (widget: any) => {
    routes.Router.replaceRoute(
      `/embeded-widget?widget=${_.toLower(widget.value)}`
    )
  }

  const handleIFrameBack = (event: React.MouseEvent) => {
    const iframeObject = _.get(iframeRef, 'current')
      ? (_.get(iframeRef, 'current') as HTMLIFrameElement)
      : null
    if (iframeObject && iframeObject.contentWindow) {
      iframeObject.contentWindow.history.back()
    }
  }

  const handleIFrameNext = (event: React.MouseEvent) => {
    const iframeObject = _.get(iframeRef, 'current')
      ? (_.get(iframeRef, 'current') as HTMLIFrameElement)
      : null
    if (iframeObject && iframeObject.contentWindow) {
      iframeObject.contentWindow.history.forward()
    }
  }

  const handleIFrameRefresh = (event: React.MouseEvent) => {
    const iframeObject = _.get(iframeRef, 'current')
      ? (_.get(iframeRef, 'current') as HTMLIFrameElement)
      : null
    if (iframeObject && iframeObject.contentWindow) {
      iframeObject.contentWindow.location.reload()
    }
    setOutputEventData({})
  }

  const handleIFrameReset = (event: React.MouseEvent) => {
    setSelectedWidget(prev => {
      if (prev) {
        const split = _.split(_.get(prev, 'path') || '', '#')
        return {
          ...prev,
          path: split[1] ? split[0] : split[0] + '#reset'
        }
      }
      return null
    })
    if (selectedWidget) {
      const test = selectedWidget.value
        ? `?widget=${selectedWidget.value || ''}`
        : ''
      routes.Router.replaceRoute(
        `/embeded-widget${
          selectedWidget.value ? `?widget=${selectedWidget.value || ''}` : ''
        }`
      )
    } else {
      routes.Router.replaceRoute(`/embeded-widget`)
    }
    setOutputEventData({})
  }

  const handleSubmitURL = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }
    setWidgetURL(URLText)
  }

  const handleURLTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setURLText(event.target.value)
  }

  const decodeURI = (uri: string) => {
    if (typeof window !== 'undefined') {
      return window.decodeURI(uri)
    } else {
      return uri
    }
  }

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabState(newValue)
  }

  return (
    <>
      <CssBaseline />
      <Grid className={classes.root}>
        <Grid container className={classes.widgetGallery}>
          <Grid item xs={3}>
            <Paper className={classes.widgetGallerySide}>
              <Grid className={classes.widgetGalleryHeader}>
                <Typography variant='h4'>Embedded Widget</Typography>
              </Grid>
              <Divider variant='fullWidth' />
              <List component='nav' aria-labelledby='nested-list-subheader'>
                {_.map(widgetGroup, (widget, index) => (
                  <React.Fragment key={index}>
                    {widget.child.length > 1 ? (
                      <WidgetGroupListItem widget={widget}>
                        <List component='div' disablePadding>
                          {_.map(widget.child, (widgetChild, index) => (
                            <React.Fragment
                              key={'widget ' + widget.label + ' ' + index}
                            >
                              <ListItem
                                selected={
                                  _.get(selectedWidget, 'label') ===
                                  widgetChild.label
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
                    ) : (
                      <ListItem
                        selected={
                          _.get(selectedWidget, 'label') === widget.label
                        }
                        button
                        onClick={() => handleChangeWidget(widget)}
                      >
                        <ListItemText primary={widget.label} />
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            {loading ? null : (
              <>
                <AppBar position='static' color='default'>
                  <Tabs
                    value={tabState}
                    onChange={handleTabChange}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='scrollable'
                    scrollButtons='auto'
                  >
                    {selectedWidget && selectedWidget.path ? (
                      <Tab label='Playground' id='0' value={0} />
                    ) : null}
                    <Tab label='Document' id='1' value={1} />
                  </Tabs>
                </AppBar>

                <TabPanel value={tabState} index={0}>
                  <Grid item xs={4}>
                    <IconButton aria-label='back' onClick={handleIFrameBack}>
                      <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton aria-label='next' onClick={handleIFrameNext}>
                      <NavigateNextIcon />
                    </IconButton>
                    <IconButton
                      aria-label='refresh'
                      onClick={handleIFrameRefresh}
                    >
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
                  <form onSubmit={handleSubmitURL}>
                    <Grid container spacing={3}>
                      <Grid item xs={10}>
                        <TextField
                          id='url-basic'
                          variant='outlined'
                          fullWidth
                          value={decodeURI(URLText || '')}
                          onChange={handleURLTextChange}
                        />
                      </Grid>
                      <Grid item xs={1} container alignContent='center'>
                        <Button
                          color='primary'
                          variant='contained'
                          aria-label='reset'
                          type='submit'
                        >
                          Go
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  <Grid item xs={12} className={classes.iframLayout}>
                    <iframe
                      key={_.get(selectedWidget, 'path')}
                      ref={iframeRef}
                      className={classes.iframe}
                      src={`${widgetURL}`}
                      onLoad={iframeInitial}
                    />
                  </Grid>
                </TabPanel>
                <TabPanel value={tabState} index={1}>
                  <div
                    className='markdown-body'
                    dangerouslySetInnerHTML={{
                      __html: md.render(
                        _.get(selectedWidget, 'document') || `# Comming soon`
                      )
                    }}
                  ></div>
                </TabPanel>
              </>
            )}
          </Grid>
        </Grid>
        {selectedWidget && selectedWidget.path ? (
          <Paper className={classes.eventResponse}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='h6'>Event Response</Typography>
              </Grid>
              <Grid className={classes.code} item xs={12}>
                <ObjectInspector
                  data={outputEventData}
                  expandLevel={3}
                  theme={'chromeDark'}
                />
              </Grid>
            </Grid>
          </Paper>
        ) : null}
      </Grid>
    </>
  )
}

const WidgetGroupListItem: React.FunctionComponent<{
  widget: any
}> = ({ widget, children }) => {
  const [open, setOpen] = React.useState(true)

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

const TabPanel: React.FunctionComponent<{
  value: any
  index: number
}> = ({ value, index, children }) => {
  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

WidgetGallery.getInitialProps = async ({ req, res, query }) => {
  return {
    query
  }
}

export default WidgetGallery
