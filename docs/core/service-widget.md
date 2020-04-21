# Service Hms-Widget
`Service` responsible get data from `DataManager`, validate by `Validator` and return data to widget.

# Create/Register New Service
To create new `Service`, you can follow these step
1. Create new file and place it in project (we recommand place it in `service` folder)
2. Create new class that extends `AbstractService` that need to definition `createDataManager` method which use to create `dataManager`

```ts
    export default class PatientService extends AbstractService {
        createDataManager(resource: string, adapter: IAdapter): DataManager {
            return new PatientDataManager(resource, adapter)
        }
    }
```
`Service` object is created automaticly by HMSServiceFactory when call method `getService` and return it to caller

You can register your `Service` class by these step
1. Modify object `serviceConfig` in `config/index.ts` with your new `Service` class
```ts
// config/index.ts
export const serviceConfig = {
    // ...
    [<modeName>]: { clazz: <ServiceClass> }, // ['$DEVELOP']: { clazz: DevelopmentAdapter }, modeName muse start with '$'
    //   ...
}
```
2. Register it in `HMSServiceFactory` by use `BootstrapHelper` and component `BootstrapWrapper` (if use react) to register. (More infomation can read [this link](bootstrap.md))
   - `BootstrapHelper` have method `registerServices` to register `Service` by receive `array of services'name` that value is in object `serviceConfig` in `config/index.ts` 
   - `BootstrapWrapper` for use in `react`. You can wrap your component with it to register `Validators` and  `Service` automatic by read value from `config/widget_dependencies.json`. We will explain it later

# How to use `Service`
After you register your `Service` in `ValidatorManager`. You can get `Service` object by use method `compile` from `ValidatorManager` that receive `schema` to decide which `Service` need to return

```ts
// result object is receive from api server or `DataManager`
    const usePatient = (patientId: string): IServiceResult => {
        const patientService = HMSService.getService('patient') as PatientService
        return patientService.load(patientId)
    }
}
```

# HMSServiceFactory
HMSServiceFactory is tha main class for register and create `service`.

**Reference HMSServiceFactory**
- properties

| name           | type                  | description                                                  |
| -------------- | --------------------- | ------------------------------------------------------------ |
| registry       | Map<string, any>      | Property to to match between name service and class          |
| instances      | Map<string, IService> | Property to to match between name service and object service |
| defaultAdatper | IAdapter, null        | Default adapter to create DataManager                        |

- method

| name              | parameters                             | description                                                                                        |
| ----------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| register          | (name: string, clazz: any)             | Set Register property by match between name and class                                              |
| isExist           | (name: string)                         | Check if service object is exist, if exist return true                                             |
| getService        | (resource: string, adapter?: IAdapter) | Get service object if not exist it will create automatic. If not send adapter, it will use default |
| setDefaultAdapter | (adapter: IAdapter)                    | Set default Adapter                                                                                |