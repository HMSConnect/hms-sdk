# Patient Allergy Intolerance Table

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/allergy-intolerance/:patientId`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/allergy-intolerance/:patientId` url to your iframe project.

## Request HTTP GET
**Params**
| Key       | Type/Format | Description              |
| --------- | ----------- | ------------------------ |
| patientId | string      | `required` ID of patient |

**Query Params**
| Key                        | Type/Format | Default   | Description                                                                                |
| -------------------------- | ----------- | --------- | ------------------------------------------------------------------------------------------ |
| initialFilter[codeText]    | string      | undefined | InitialFilter is original filter, when click `reset` filter value will equal initialFilter |
| initialFilter[type]        | string      | undefined | InitialFilter is original filter, when click `reset` filter value will equal initialFilter |
| initialFilter[criticality] | string      | undefined | InitialFilter is original filter, when click `reset` filter value will equal initialFilter |
| max                        | number      | 20        | Number of total records in each fetch                                                      |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)
- **Avaliable event response**
   | Action | Message            | Description                                       |
   | ------ | ------------------ | ------------------------------------------------- |
   | -      | handleLoadMore     | Event is called when scorll to bottom of timeline |
   | -      | handleSearchSubmit | Event is called when submit search                |
   | -      | handleSearchReset  | Event is called when click reset                  |
   | -      | handleModalShow    | Event is called when click filter icon to open    |
   | -      | handleModalClose   | Event is called when click close filter modal     |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/allergy-intolerance/6f8f470e-07e8-4273-ad11-6e3fdc384a09` 

### Action
 - Scroll to bottom of table

### Response
```json
{
    "message": "handleLoadMore",
    "params": {
        "filter": {

            "patientId": "6f8f470e-07e8-4273-ad11-6e3fdc384a09",
            "assertedDate_lt": Mon Nov 29 1971 07:31:15 GMT+0700 (Indochina Time),
            "criticality": "",
            "category": "",
            "codeText": ""

        },
        "max": 20
    },
    "eventType": "embedded-widget"
}
```
