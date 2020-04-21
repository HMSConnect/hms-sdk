# Adapter Hms-Widget
`Adapter` responsible for config api endpoint such as domain and port. 

## Create/Register New Adapter
 To create new `Adapter`, you can follow these step
 1. Create new file and place it in project (we recommand place it in `adapters` folder)
 2. Create new class that extends `AbstractAdapter`.You need to definition properties `host` and `env` and method `doRequest` that use to call api from `host` and return some data that get from api 

``` ts
// adapters/DevelopmentAdapter.ts
export default class DevelopmentAdapter extends AbstractAdapter {
  constructor(host: string) {
    super(host, 'dev')
  }

  async doRequest(resource: string, params: any): Promise<AxiosResponse<any>> {
    // console.info(`requesting for ${resource} with params = `, params)
    const result = await Axios.get(`${this.host}/${resource}`, {
      params,
      paramsSerializer: params => stringify(params)
    })
    return result.data
  }
}

```
3. After you create class you need to register your class in `config/index.ts`. You can do by modify object `adapterConfig`
```ts
  export const adapterConfig = {
     // ...
    [<modeName>]: { clazz: <AdapterClass> }, // ['$DEVELOP']: { clazz: DevelopmentAdapter }, modeName muse start with '$'
    //   ...
  }
```
# DataAdapterManager
DataAdapterManager is tha class to create dataAdapter.

**Reference DataAdapterManager**

- method
| name          | parameters     | description                                                                    |
| ------------- | -------------- | ------------------------------------------------------------------------------ |
| createAdapter | (mode: string) | Create `DataAdapter` by use mode and set defaultAdapter in `HMSServiceFactory` |
