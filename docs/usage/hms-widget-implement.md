# Hms-Widget implement start

# Create new Widget
To create new widget and release it to use via iframe, you can follow this setp
1. HMS use nextjs to serve file so our process for create new widget same as create page for nextjs. By Create widget in `pages` folder. In our design, demo app will create in `pages` folder, widget is created in `pages/embedded-widget`.
2. For widget's definition, if your widget need to use service's object you can inject it by use `BootstrapWrapper`. BootstrapWrapper's props is 'dependencies' which receive array of name of service that follow in `config/widget_dependencies.json` 
```tsx
    <BootstrapWrapper dependencies={['patient', 'allergy_intolerance']}>
      <>
        <CssBaseline />
        <Paper>
          <div style={{ height: '100vh' }}>
            <PatientDemographicWithConnector
              patientId={_.get(query, 'patientId')}
              name={_.get(query, 'name')}
            />
          </div>
        </Paper>
      </>
    </BootstrapWrapper>
```
example for use service

```ts
    const patientService = HMSService.getService('patient') as PatientService
    return patientService.load(patientId)
```

1. Widget need to add `getInitialProps` for get query string
```ts
    export interface IStatelessPage<P = {}> extends React.SFC<P> {
        getInitialProps?: (ctx: any) => Promise<P>
    }

    const <NewWidget>: IStatelessPage<{
    query: any
    }> = ({ query }) => {
    // ... Component defination
    }
    <NewWidget>.getInitialProps = ({
        req,
        res,
        query,
    }) => {
        return {
            query: parse(query),
        }
    }
```
4. Create route to access widget from url in `routes.js`

```js
    .add(
        'embedded-widget/patient-summary', // name widget
        '/embedded-widget/patient-summary', // path for access by url and acces by iframe-sdk
        'embedded-widget/patient-info/patient-summary', // widget's location
    )
```
(Optional) In HMS, we support our widget with redux by follow there step

5. create new reducer in folder `reducers-redux`
6. if you want to config structure from iframe you need to define structure config in inital state in reducer. and add action type start with `SET_STRUCTURE_`
```ts
type PatientDemographicType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC'

interface IPatientDemographicAction {
  type: PatientDemographicType
  payload: any
}
export const patientDemographicInitialState: any = {
  structure: {
    addressField: true,
    ageField: true,
    nameField: true,
  },
}
const patientDemographic = (
  state = patientDemographicInitialState,
  action: IPatientDemographicAction,
) => {
  switch (action.type) {
    // ...
    case 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC':
      return {
        ...state,
        structure: {
          ...state.structure,
          ...action.payload,
        },
      }
   // ...
  }
}
```
7. import your reducer in `reducers-redux/index.reducer.ts`

(Optional) To apply theme in widget. We use `meterial-ui` for config and provide theme

8. After we config theme we can use it same as `meterial-ui`
```tsx
const useStyles = makeStyles((theme: Theme) => ({
  headerTitle: {
    color: theme.palette.text.secondary,
  },
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
 
}))

const <NewWidget>: React.FunctionComponent<{
    query: any
    }> = ({ query }) => {
    // ... Component defination
        const classes = useStyles()
        return <div className={classes.root}><h1 className={classes.headerTitle}></h1></div>
    }
```



## Config Theme

Hms-widget use `material-ui` for style and theme provider. you can set theme by follow these step
1. Create new theme file in `styles` folder by use `createMuiTheme` function from `material-ui`
```ts
createMuiTheme({
  palette: {
    action: {
      hover: '#ddd4',
      selected: '#ddd4',
    },
    text: {
      primary: '#37474f',
      secondary: '#607d8b',
    },
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#00b0ff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    tertiary: generateDarkAndLight({
      main: '#ef5350',
    }),
  },
})
```
2. (Optional) Meterial-ui provide limit pallette so if you want to add more, you can add in `styles\ThemeManager.ts` 
```ts
declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    tertiary?: SimplePaletteColorOptions
  }
  interface Palette {
    tertiary?: SimplePaletteColorOptions
  }
}
```
3. (Optional) If you want your theme to default config you can config by use `ThemeManager.setDefaultTheme` in `templates/ThemeLayout` by send `name of file theme`
4. Theme support redux to change theme in running app `reducers-redux/theme.reducer.ts`