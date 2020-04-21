# DataManager Hms-Widget
`DataManager` responsible for get data from endpoint.

## Create/Register DataManager
To create new `DataManager`, you can follow these step
 1. Create new file and place it in project (we recommand place it in `data-managers` folder)
 2. Create new class that extends `DataManager` that need to definition `resource` and `adaptor` properties. We will definition and create it in `Service` while we create object by `new` (More infomation can read [this link](service-widget.md))

```ts
class PatientDataManager extends DataManager {
  // customize operation if needed
  resourceList(id: string | number, query?: any): Promise<any> {
    return this.adaptor.doRequest(
      `${this.resource}/${id}/resource-list/`,
      query,
    )
  }
}
```

DataManager class we provide method load and list to query data from server by default
