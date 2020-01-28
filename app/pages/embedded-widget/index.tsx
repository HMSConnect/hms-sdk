import React, { useEffect } from 'react'

import SelectOption from '@components/base/SelectOption'
import SideMenuWithContent from '@components/base/SideMenuWithContent'
import {
  IWidgetChild,
  IWidgetGroup,
  IWidgetPatameter,
  widgetGalleryAllergyIntoleranceConfig,
  widgetGalleryDiagnosticReportConfig,
  widgetGalleryEncounterConfig,
  widgetGalleryPatientConfig,
  widgetGalleryObservationConfig,
} from '@config'
import {
  AppBar,
  Box,
  Button,
  Collapse,
  createStyles,
  CssBaseline,
  Divider,
  Fab,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Switch,
  Tab,
  Tabs,
  TextField,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import RefreshIcon from '@material-ui/icons/Refresh'
import { IStatelessPage } from '@pages/patient-search'
import * as _ from 'lodash'
import MarkdownIt from 'markdown-it'
import { parse, stringify } from 'qs'
import { ObjectInspector } from 'react-inspector'
import routes from '../../routes'
import AdaptiveInput from '@components/base/AdaptiveInput'

const md = MarkdownIt({ html: true })

const widgetGroup: IWidgetGroup[] = [
  {
    child: [
      {
        document: require('@assets/embedded-widget/get-started.md').default,
        label: 'Get Started',
        value: 'get-started',
      },
    ],
    label: 'Get Started',
    value: 'get-started',
  },
  {
    child: [
      {
        document: require('@assets/embedded-widget/html-demo/index.md').default,
        label: 'HTML Demo',
        path: '../../static/public/index.html',
        pathType: 'static',
        value: 'html-demo',
      },
    ],
    label: 'HTML Demo',
    value: 'html-demo',
  },
  widgetGalleryPatientConfig,
  widgetGalleryObservationConfig,
  widgetGalleryEncounterConfig,
  widgetGalleryDiagnosticReportConfig,
  widgetGalleryAllergyIntoleranceConfig,
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    code: {
      background: 'rgb(36, 36, 36)',
      borderRadius: 8,
      height: '100%',
      minHeight: '20vh',
      padding: 16,
    },
    eventResponse: {
      minHeight: '30vh',
      padding: theme.spacing(2),
      width: '100%',
    },
    extendedIconLeft: {
      marginLeft: theme.spacing(1),
    },
    iframLayout: {
      display: 'flex',
      minHeight: '60vh',
    },
    iframe: {
      flex: '1 1 auto',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    parameterLayout: {
      height: '100%',
      padding: theme.spacing(2),
    },
    root: {},
    urlInputProps: {
      height: 45,
    },
    widgetGallery: {
      marginBottom: 16,
    },
    widgetGalleryHeader: {
      padding: theme.spacing(2),
    },
    widgetGallerySide: {
      backgroundColor: theme.palette.background.paper,
      height: '100%',
      padding: theme.spacing(2),
      width: '100%',
    },
  }),
)

const WidgetGallery: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  const iframeRef = React.useRef<null | HTMLIFrameElement>(null)
  const [
    selectedWidget,
    setSelectedWidget,
  ] = React.useState<IWidgetChild | null>(null)
  const [outputEventData, setOutputEventData] = React.useState({}) // for event response

  const [widgetURL, setWidgetURL] = React.useState<string | undefined>('') // url for iframe
  const [URLText, setURLText] = React.useState<string | undefined>('') //  for text input
  const [loading, setLoading] = React.useState(true)
  const [tabState, setTabState] = React.useState(0) // for change tab state 0 is Playground, 1 is document

  const [queryParams, setQueryParams] = React.useState({}) // for keep stage queryParams
  const [parameters, setParameters] = React.useState({}) // for keep stage parameter

  useEffect(() => {
    window.addEventListener(
      'message',
      event => {
        if (event.data.eventType !== 'embedded-widget') {
          return
        }
        if (event.data.action === 'REPLACE_ROUTE') {
          const queryParams = _.split(event.data.path, '?')
          if (queryParams[1]) {
            setQueryParams(parse(queryParams[1], { depth: 0 }))
          }
        }
        setOutputEventData(event.data)
        if (event.data.path) {
          setURLText(event.data.path)
        }
        // setWidgetURL(event.data.path)
      },
      false,
    )
    setLoading(false)

    return () => {
      console.info('unregister iframe :')
    }
  }, [])

  useEffect(() => {
    if (query) {
      setLoading(true)
      let findWidget = _.chain(widgetGroup)
        .map(widget => widget.child)
        .flatten()
        .find(
          (widget: any) => _.toLower(widget.value) === _.toLower(query.widget),
        )
        .value()
      setTabState(findWidget && findWidget.path ? 0 : 1)
      findWidget = findWidget ? findWidget : widgetGroup[0].child[0]
      const newQueryParams = initialQueryParams(findWidget)
      const url = getCorrectURL(findWidget, null, newQueryParams)

      setSelectedWidget(findWidget)
      initialParameter(findWidget)

      setWidgetURL(url)
      setURLText(url)

      setLoading(false)
    }
  }, [query])

  const getCorrectURL = (
    selectedWidget: any,
    parameters?: any,
    queryParams?: any,
  ) => {
    let url = _.get(selectedWidget, 'path')
    if (!url) {
      return ''
    }
    if (parameters) {
      _.each(parameters, (value, key) => {
        url = _.replace(url, `:${key}`, value)
      })
    } else {
      _.each(selectedWidget.parameters, parameter => {
        url = _.replace(url, `:${parameter.value}`, parameter.defaultValue)
      })
    }
    if (queryParams) {
      const stringQueryParam = parse(stringify(queryParams), { depth: 0 })
      const newQueryParams = _.reduce(
        stringQueryParam,
        (acc, value, key) => {
          if (value) {
            return { ...acc, [key]: value }
          }
          return acc
        },
        {},
      )
      if (_.isEmpty(newQueryParams)) {
        return `${url}`
      }
      return `${url}?${stringify(newQueryParams)}`
    }

    return url
  }

  const initialParameter = (selectedWidget: any) => {
    const newState = _.chain(_.get(selectedWidget, 'parameters'))
      .reduce((acc, parameter) => {
        return {
          ...acc,
          [parameter.value]: parameter.defaultValue,
        }
      }, {})
      .value()
    setParameters(newState)
  }

  const initialQueryParams = (selectedWidget: any) => {
    const newState = _.chain(_.get(selectedWidget, 'queryParams'))
      .reduce((acc, parameter) => {
        return {
          ...acc,
          [parameter.value]: parameter.defaultValue,
        }
      }, {})
      .value()

    setQueryParams(newState)
    return newState
  }

  const handleQueryParamChange = (type: string, value: any) => {
    setQueryParams(prev => ({
      ...prev,
      [type]: value,
    }))
  }
  const handleParameterChange = (type: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [type]: value,
    }))
  }

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
      `/embedded-widget?widget=${_.toLower(widget.value)}`,
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
          path: split[1] ? split[0] : split[0] + '#reset',
        }
      }
      return null
    })
    if (selectedWidget) {
      // const test = selectedWidget.value
      //   ? `?widget=${selectedWidget.value || ''}`
      //   : ''
      routes.Router.replaceRoute(
        `/embedded-widget${
          selectedWidget.value ? `?widget=${selectedWidget.value || ''}` : ''
        }`,
      )
    } else {
      routes.Router.replaceRoute(`/embedded-widget`)
    }
    setOutputEventData({})
  }

  const handleSubmitURL = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }

    // clear specific local storage
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('medicalPanelRecord')
    }

    if (selectedWidget && selectedWidget.path) {
      const url = getCorrectURL(selectedWidget, parameters, queryParams)
      const iframeObject = _.get(iframeRef, 'current')
        ? (_.get(iframeRef, 'current') as HTMLIFrameElement)
        : null

      if (iframeObject && iframeObject.contentWindow) {
        iframeObject.contentWindow.location.replace(url)
      }
      setURLText(url)
    }
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
      <SideMenuWithContent
        menuTitle='Embedded Widget'
        appBarTitle={selectedWidget?.label}
        renderMenuList={
          <WigetMenuList
            onItemClick={handleChangeWidget}
            selectedWidget={selectedWidget}
          />
        }
      >
        {!loading && (
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
              <Grid container>
                {selectedWidget &&
                _.isEmpty(selectedWidget.parameters) &&
                _.isEmpty(selectedWidget.queryParams) ? null : (
                  <Grid item xs={3}>
                    <Paper className={classes.parameterLayout}>
                      <form onSubmit={handleSubmitURL}>
                        <WidgetParameters
                          parameters={parameters}
                          selectedWidget={selectedWidget}
                          onParameterChange={handleParameterChange}
                          type='parameters'
                          label='Parameters'
                        />
                        <WidgetParameters
                          parameters={queryParams}
                          selectedWidget={selectedWidget}
                          onParameterChange={handleQueryParamChange}
                          type='queryParams'
                        />
                        <Grid container justify='flex-end'>
                          <Fab
                            variant='extended'
                            size='medium'
                            color='primary'
                            aria-label='go'
                            type='submit'
                          >
                            Execute
                            <Icon className={classes.extendedIconLeft}>
                              send
                            </Icon>
                          </Fab>
                        </Grid>
                      </form>
                    </Paper>
                  </Grid>
                )}

                <Grid
                  item
                  xs={
                    selectedWidget &&
                    _.isEmpty(selectedWidget.parameters) &&
                    _.isEmpty(selectedWidget.queryParams)
                      ? 12
                      : 9
                  }
                >
                  <Paper className={classes.parameterLayout}>
                    <Grid item xs={12}>
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
                        variant='outlined'
                        aria-label='reset'
                      >
                        Reset
                      </Button>
                    </Grid>
                    <Grid
                      container
                      spacing={4}
                      alignItems='center'
                      alignContent='center'
                    >
                      <Grid item xs={12}>
                        <TextField
                          label='URL'
                          id='outlined-size-small'
                          variant='outlined'
                          fullWidth
                          value={decodeURI(URLText || '')}
                          disabled
                          InputProps={{ className: classes.urlInputProps }}
                          // style={{height: }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} className={classes.iframLayout}>
                        <iframe
                          key={_.get(selectedWidget, 'path')}
                          ref={iframeRef}
                          className={classes.iframe}
                          src={`${widgetURL}`}
                          onLoad={iframeInitial}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
              {selectedWidget?.path && (
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
              )}
            </TabPanel>
            <TabPanel value={tabState} index={1}>
              <div
                className='markdown-body'
                dangerouslySetInnerHTML={{
                  __html: md.render(
                    _.get(selectedWidget, 'document') || `# Comming soon`,
                  ),
                }}
              ></div>
            </TabPanel>
          </>
        )}
      </SideMenuWithContent>
    </>
  )
}

const WidgetParameters: React.FC<{
  parameters: any
  selectedWidget: any
  onParameterChange: (type: string, value: any) => void
  label?: string
  type?: string
}> = ({
  parameters,
  selectedWidget,
  onParameterChange,
  label = 'Query Params',
  type = 'queryParams',
}) => {
  const renderInput = (parameter: IWidgetPatameter, key: string) => {
    switch (parameter.type) {
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={parameters[parameter.value]}
                onChange={event =>
                  onParameterChange(parameter.value, event.target.checked)
                }
                color='primary'
              />
            }
            label={parameter.label}
          />
        )
      case 'number':
        return (
          <TextField
            id={key}
            label={parameter.label}
            fullWidth
            variant='outlined'
            value={parameters[parameter.value]}
            onChange={event =>
              onParameterChange(parameter.value, event.target.value)
            }
            type='number'
          />
        )
      case 'options':
        if (!parameter.choices) {
          return
        }
        return (
          <SelectOption
            label={parameter.label}
            labelId={key}
            id={key}
            value={parameters[parameter.value]}
            options={parameter.choices}
            onChange={(
              event: React.ChangeEvent<{ name?: string; value: unknown }>,
            ) => {
              onParameterChange(parameter.value, event.target.value)
            }}
            fullwidth
          />
        )
      case 'text':
        return (
          <TextField
            id={key}
            label={parameter.label}
            fullWidth
            variant='outlined'
            value={parameters[parameter.value]}
            onChange={event =>
              onParameterChange(parameter.value, event.target.value)
            }
          />
        )
      default:
        return (
          <TextField
            id={key}
            label={parameter.label}
            fullWidth
            variant='outlined'
            value={parameters[parameter.value]}
            onChange={event =>
              onParameterChange(parameter.value, event.target.value)
            }
          />
        )
    }
  }
  if (_.isEmpty(selectedWidget[type])) {
    return null
  }
  return (
    <>
      <Typography variant='h5'>{label}</Typography>
      <br />
      {_.map(selectedWidget[type], (parameter, index) => (
        <React.Fragment key={`${parameter.value}parameters${index}`}>
          {/* {renderInput(parameter, `${type}outlined-basic${index}`)} */}
          <AdaptiveInput
            name={parameter.value}
            type={parameter.type}
            label={parameter.label}
            value={parameters}
            id={`${parameter.value} ${index}`}
            onChange={onParameterChange}
            choices={parameter.choices}
          />
          <br />
          <br />
        </React.Fragment>
      ))}
    </>
  )
}

const WigetMenuList: React.FunctionComponent<any> = ({
  selectedWidget,
  onItemClick,
}) => {
  const classes = useStyles()
  return (
    <List component='nav' aria-labelledby='nested-list-subheader'>
      {_.map(widgetGroup, (widget, index) => (
        <React.Fragment key={index}>
          {widget.child.length > 1 ? (
            <WidgetGroupListItem widget={widget}>
              <List component='div' disablePadding>
                {_.map(widget.child, (widgetChild, index) => (
                  <React.Fragment key={'widget ' + widget.label + ' ' + index}>
                    <ListItem
                      selected={
                        _.get(selectedWidget, 'label') === widgetChild.label
                      }
                      button
                      onClick={() => onItemClick(widgetChild)}
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
            <>
              <ListItem
                selected={_.get(selectedWidget, 'label') === widget.label}
                button
                onClick={() => onItemClick(widget)}
              >
                <ListItemText primary={widget.label} />
              </ListItem>
              <Divider />
            </>
          )}
        </React.Fragment>
      ))}
    </List>
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
    query,
  }
}

export default WidgetGallery
