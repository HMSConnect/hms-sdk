# Patient Search Result

If you are new user, please read [Getting started with HMS Widget](/embeded-widget?widget=get-started)


URL: `/embeded-widget/patient-search-result`

## Setup this widget to iframe
Replace `/embeded-widget/patient-search-result` url to your iframe project.

## Request HTTP GET
**Query Params**
| Key                | Type/Format         | Default | Description                                      |
| ------------------ | ------------------- | ------- | ------------------------------------------------ |
| filter[gender]     | ` male|female|all ` | all     | Filter patient result by gender                  |
| filter[searchText] | string              | ""      | Filter patient result by name/surname/identifier |
| max                | number              | 10      | Number of total records in one page              |
| offset             | number              | 0       | Index for lazyload                               |
| page               | number              | 1       | Page number                                      |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embeded-widget?widget=get-started)
- **Avaliable event response**
   | Action        | Message             | Description                              |
   | ------------- | ------------------- | ---------------------------------------- |
   | REPLACE_ROUTE | handlePageChange    | Event is called when page\max is changed |
   | REPLACE_ROUTE | handleRequestSort   | Event is called when click sort button   |
   | PUSH_ROUTE    | handlePatientSelect | Event is called when click row data      |

## Example

### Request
 - pathname: `/embeded-widget/patient-search-result` 

### Action
 - Click row data

### Response
```json
{
    "action": "PUSH_ROUTE",
    "message": "handlePatientSelect",
    "params": {
        "id": "039933a0-f970-4a84-bdab-fcbd85edd343"
    },
    "path": "embeded-widget/patient-info/039933a0-f970-4a84-bdab-fcbd85edd343"
}
```
