# Validator Hms-widget
`Validator` responsible for transform data that api response from endpoint. 

## Create/Register New Validator
`Validator` responsible for transform data that api response from endpoint. 

To create new `Validator`, you can follow these step
 1. Create new file and place it in project (we recommand place it in `validators` folder)
 2. Create new class that implements `IValidator`. You need to definition  method `isValid` and `parse`. 
    1. `isValid` method use to decide what validator is used for api response data. It receive schema object which have three value to decided 
         - standard
         - version
         - resourceType
     
       and return true if valid, false if not valid
    2. `parse` method use to transform data to use in widget. It receive data and return new data

``` ts
// validators/standard/sfhir/SFHIRPatientV1Validator.ts
export default class SFHIRPatientV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'patient'
    )
  }

  parse(patient: any): any {
    // ... 
    compileStandard = {
      address: [address],
      age,
      birthDate: patient.birthDate,
      communication,
      deceasedDateTime: patient.deceasedDateTime,
      email: patient.email,
      gender: patient.gender,
      identifier,
      name,
      telecom: patient.telecom,
    }
    return compileStandard
  }
}

```
You can register your `Validator` class by these step
1. Modidy object `validatorConfig` in `config/index.ts` with your new `Validator` class
```ts
// config/index.ts
export const validatorConfig = {
    // ...
    [<modeName>]: { clazz: <ValidatorClass>, priority: 1 }, // ['$DEVELOP']: { clazz: DevelopmentAdapter }, modeName muse start with '$'
    // priority is used to decide what validator is use if there are multiple validators is valid. If number is high it have more priority
    //   ...
}
```
2. Register it in `ValidatorManager` by use `BootstrapHelper` and component `BootstrapWrapper` (if use react) to register (More infomation can read [this link](bootstrap.md))
   - `BootstrapHelper` have method `registerValidators` to register `Validator` by receive `array of validators'name` that value in object `validatorConfig`
   - `BootstrapWrapper` for use in `react`. You can wrap your component with it to register `Validators` and  `Service` automatic by read value from `@config/widget_dependencies.json`. We will explain it later

### How to use `Validator`
After you register your `Validator` in `ValidatorManager`. You can get `Validator` object by use method `compile` from `ValidatorManager` that receive `schema` to decide which `Validator` need to return

```ts
    // result object is receive from api server or `DataManager`

    // schema object
    // {
    //     standard: 'SFHIR', // what standard do you use such as 'SFHIR', 'HMS
    //     version: 1.0, 
    //     resourceType: 'patient', // your resource type
    // }
    const validator = ValidatorManager.compile(result.schema)
    if (validator) {
        const test = _.map(result.data, (entry: any) => {
        return validator.parse(entry)
    })
```


# ValidatorManager
ValidatorManager is tha main class for register and get `validator` object.

**Reference ValidatorManager**
- interface

IValidatorRegistry 

| name      | type       | description                                                  |
| --------- | ---------- | ------------------------------------------------------------ |
| name      | string     | name of validator                                            |
| priority  | number     | Prioirity for decide when multiple validator are valid       |
| validator | IValidator | Property to to match between name service and object service |

ISchema 

| name         | type                    | description                         |
| ------------ | ----------------------- | ----------------------------------- |
| version      | number                  | Version of schema type              |
| standard     | 'SFHIR' , 'HMS_CONNECT' | Type of standard for transform data |
| resourceType | string                  | ResourceType of data                |

- properties

| name      | type               | description                                                  |
| --------- | ------------------ | ------------------------------------------------------------ |
| instances | IValidatorRegistry | Property to to match between name service and object service |

- method

| name     | parameters                                   | description                                            |
| -------- | -------------------------------------------- | ------------------------------------------------------ |
| register | (name: string, clazz: any, priority: number) | Set instances property                                 |
| isExist  | (name: string)                               | Check if service object is exist, if exist return true |
| compile  | (schema: ISchema)                            | Get validator object                                   |