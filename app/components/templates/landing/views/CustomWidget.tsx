import React from 'react'

import {
  // {Button as MatButton},
  Button as MatButton,
  Tab,
  Tabs,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import AppBar from '../modules/AppBar'
import Button from '../modules/Button'
import TabPanel from '../modules/Tabpanel'
import Typography from '../modules/Typography'
import Toolbar from '../modules/Toolbar'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Highlight from 'react-highlight.js'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.light,
      display: 'flex',
      overflow: 'hidden',
    },
    appBar: {
      borderRadius: '10px 10px 0px 0px',
    },
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(15),
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    gridCellContainer: {
      overflow: 'auto',
      height: '400px',
    },
    mdContainer: {
      '& pre': {
        color: '#24292e',
        fontSize: 18,
      },
      '& th': {
        color: '#24292e',
      },
      '& td': {
        color: '#24292e',
      },
      color: theme.palette.text.primary,
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
    },
    title: {
      marginBottom: theme.spacing(10),
    },
    number: {
      fontSize: 24,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    image: {
      height: 55,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      borderRadius: '6px',
    },
    curvyLines: {
      pointerEvents: 'none',
      position: 'absolute',
      left: -80,
      transform: 'rotate(180deg)',
    },
    button: {
      marginTop: theme.spacing(8),
    },
    float: {
      zIndex: 100,
    },
    highlight: {
      fontSize: 16,
      '& code': {
        borderRadius: '0px 0px 6px 6px ',
      },
      '& pre': {
        margin: 0,
      },
    },
    tabsContainer: {
      fontSize: 24,
    },
    iconCollapse: {
      color: theme.palette.primary.contrastText,
    },
  }),
)
const CustomWidget: React.FunctionComponent<any> = (props) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src='../../../../static/images/landingCurvyLines.png'
          className={classes.curvyLines}
          alt='curvy lines'
        />
        <Typography
          variant='h4'
          marked='center'
          className={classes.title}
          component='h2'
        >
          <b>Customize the widget</b>
        </Typography>
        <Grid container spacing={5} className={classes.float}>
          <Grid item xs={12} md={12}>
            <div className={classes.item}>
              <Typography variant='h5' align='center'>
                HMS Widget provide some method for user can custom independently
                such as color, font or show/hide some attribute.
              </Typography>
              <Button
                color='secondary'
                size='large'
                variant='contained'
                className={classes.button}
                href='/embedded-widget?widget=get-started'
              >
                More info
              </Button>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={5} className={classes.float}>
          <Grid item xs={12} md={12}>
            <div className={clsx(classes.item)}>
              <img
                src='../../../../static/images/patientDemographicCustom.png'
                alt='suitcase'
                className={classes.image}
                style={{ height: '100%' }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={5} className={classes.float}>
          <Grid item xs={12} md={12}>
            <CustomWidgetPanel />
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default CustomWidget

const CustomWidgetPanel: React.FunctionComponent<any> = () => {
  const [value, setValue] = React.useState(0)
  const [open, setOpen] = React.useState(true)
  const classes = useStyles()
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleClickShow = () => {
    setOpen(!open)
  }

  return (
    <>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'
          >
            <Tab className={classes.tabsContainer} label='HTML' />
          </Tabs>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton
            edge='end'
            aria-label='show all'
            onClick={() => handleClickShow()}
            className={classes.iconCollapse}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Collapse
        in={open}
        timeout='auto'
        unmountOnExit
        className={classes.highlight}
      >
        <TabPanel value={value} index={0}>
          <Highlight language={'html'}>{customWidgetHtml}</Highlight>
        </TabPanel>
      </Collapse>
    </>
  )
}

const customWidgetHtml = `<!DOCTYPE html>
<html>
  <head>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/HMSConnect/hms-widget-sdk@3528ecc5679e6c32090094d21bfb3fddea767583/sdk/iframe-sdk.min.js"
    ></script>
  </head>
  <body>
    <div id="widget-example1"></div>
    ​
    <script>
      const widget1 = window.hmsWidgetAsyncInit(function (hmsWidget) {
        hmsWidget.init({
          selector: "widget-example1",
          widgetPath: "patient-info/patient-demographic",
          width: "700px",
          height: "400px",
          href: 'http://localhost:3000',
          pathPrefix: "embedded-widget",
        });
        hmsWidget.setParams({
          patientId: "0debf275-d585-4897-a8eb-25726def1ed5",
        });
        hmsWidget.setCustomizeTheme(
          {
            palette: {
              background: {
                paper: "#ffc071",
              },
              text: {
                primary: '#4d4d4d',
                secondary: '#000000',
              }
            },
          },
          "invert"
        );
        hmsWidget.setStructure({
          patientDemographic: {
            ageField: false
          }
        })
      });
    </script>
  </body>
</html>
`
