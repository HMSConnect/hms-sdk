# Bootstrap HMS-Widget
Hms-widget need some boostrap function for help widget to render correctly such as Adapter, HMSServiceFactory

# HMSServiceFactory
For bootstrap we need to set default adapter by `setDefaultAdapter`. In Hms-widget we `setDefaultAdapter` in `DataAdapterManager` 
(More infomation for HMSServiceFactory can read [this link](service-widget.md))
(More infomation for DataAdapter can read [this link](dataAdapter-widget.md))
```ts
  // adapters/DataAdapterManager.ts
    class DataAdapterManager {
        createAdapter(mode: string) {
            const Adapter = _.get(adapterConfig, `${mode}.clazz`)
            if (Adapter) {
                const adapter = new Adapter(
                    `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`,
                )
                HMSService.setDefaultAdapter(adapter) // set default adapter
            } else {
                const adapter = new DevelopmentAdapter(
                    `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`,
                )
                HMSService.setDefaultAdapter(adapter) // set default adapter
            }
        }
    }
    // pages/_app.js
    // ...
    constructor(){
        // ...
        if (typeof window !== 'undefined') {
            AdapterManager.createAdapter(<mode>)
            // AdapterManager will create adapter by use adapterConfig from 'config/index.ts'
        }
        // ...
    }
```

DefaultAdapter is important to create `DataManager` 


# BootstrapHelper
BootstrapHelper is a class that help to register `service` in `HMSServiceFactory` and `validator` in `ValidatorManager`

**Reference BootstrapHelper**
- method

| name               | parameters             | description                                                       |
| ------------------ | ---------------------- | ----------------------------------------------------------------- |
| registerServices   | (services: string[])   | Register service by use `HMSServiceFactory`                       |
| registerValidators | (validators: string[]) | Create validator object and register it by use `ValidatorManager` |

# BootstrapWrapper
BootstrapWrapper is a react component that use to register `services` and `validators` by wrap component in BootstrapWrapper. It use `BootstrapHelper` to register `services` and `validators`. If you want to use it, you need to define `@config/widget_dependencies.json` for match name with service's name and validator's name

```json
// @config/widget_dependencies.json
    {
        "patient": { // name for use in dependencies props in BootstrapWrapper component
            "services": ["$PATIENT"], // name service that match in serviceConfig in config/index.ts
            "validators": ["$SFHIR_PATIENT_V1"]// name validator that match in validatorConfig in config/index.ts
        },
    }
```
```tsx
const PatientSearchView: IStatelessPage<{
  query: IPaginationOption
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
    // BootstrapWrapper have props dependencies that contain array of name that match in `@config/widget_dependencies.json`
      <BootstrapWrapper dependencies={['patient']}>
        <AppNavBar />
        <Container maxWidth='lg' className={classes.root}>
            <PatientSearch query={query} name={_.get(query, 'name')} />
        </Container>
      </BootstrapWrapper>
    </React.Fragment>
  )
}
```
BootstrapWrapper will read `@config/widget_dependencies.json` for match name from `dependencies` props to `services` and `validators` class name. Finally, it's registered by BootstrapHelper.

# RouteManager
In Hms-widget, we serve two mode is `full` and `widget`. If it is `widget` mode, url path will startWith `/embedded-widget`. So in bootstrap, we need to know what mode that you use by use class `RouteManager`(More infomation can read [this link](route-widget.md))

`RouteManager` have method `registryMode` by get pathName. If path name is includes `embedded-widget`, it will set mode to `widget`. If not, it will set mode to `full`

```js
    // pages/_app.js
    // ...
    constructor(){
        // ...
        if (typeof window !== 'undefined') {
            const pathName = props.router.pathname
            RouteManager.registryMode(pathName)
        }
        // ...
    }
```
[More information](route-widget.md)

# GoogleAnalyticsFactory
In Hms-widget, we provide GA for anylize user. In bootstrap, you need to initialize by use `GoogleAnalyticsFactory` method `initializeGoogleGA`

```js
    // pages/_app.js
    // ...
     componentDidMount() {
        // ...
        GoogleAnalytics.initializeGoogleGA()
        // ...
    }
```
[More information](google-analytic.md)