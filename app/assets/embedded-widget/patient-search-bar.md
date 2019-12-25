# Patient Searchbar

URL: `/embeded-widget/patient-search-bar`

## Setup this widget to iframe
1. copy link url this widget
2. and setup url to your iframe project. click [get started](/embeded-widget/#/setup)

## Request HTTP GET
**Query Params**
| key                | type/format         |
| ------------------ | ------------------- |
| filter[gender]     | ` male|female|all ` |
| filter[searchText] | string              |
| max                | number              |
| offset             | number              |
| page               | number              |

## Response
- object response 
  | key     | type/format | description                           |
  | ------- | ----------- | ------------------------------------- |
  | message | string      | name of event                         |
  | params  | string      | parameters is send from widget iframe |
  | path    | string      | next path that widget will navigate   |
  | result  | object      | result of loading                     |

- avaliable response
   | action | message               | description                    |
   | ------ | --------------------- | ------------------------------ |
   | -      | initialize            | event from initialize widget   |
   | -      | handleSearchSubmit    | event from click search button |
   | -      | handlePaginationReset | event from click reset button  |

## Example

### Request
 - pathname: `/embeded-widget/patient-search-bar` 

### Response
```json
{
  "message": "initialize",
  "params": {
    "filter": {
      "gender": "all",
      "searchText": ""
    },
    "max": 10,
    "offset": 0,
    "page": 1
  },
  "path": "embeded-widget/patient-search-bar?filter%5Bgender%5D=all&filter%5BsearchText%5D=&max=10&offset=0&page=1",
  "result": {
    "error": null,
    "schema": {},
    "version": 1,
    "standard": "SFHIR",
    "resourceType": "patient",
    "data": [],
    "totalCount": 1050
  }
}
```
