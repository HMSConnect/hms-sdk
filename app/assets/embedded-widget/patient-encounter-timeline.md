# Patient Encounter Timeline

If you are new user, please read [Getting started with HMS Widget](/embeded-widget?widget=get-started)


URL: `/embeded-widget/patient-info/encounter-timeline/:patientId`

## Setup this widget to iframe
Replace `/embeded-widget/patient-info/encounter-timeline/:patientId` url to your iframe project.

## Request HTTP GET
**Params**
| Key       | Type/Format | Description              |
| --------- | ----------- | ------------------------ |
| patientId | string      | `required` ID of patient |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embeded-widget?widget=get-started)
- **Avaliable event response**
   | Action     | Message               | Description                                       |
   | ---------- | --------------------- | ------------------------------------------------- |
   | -          | handleLoadMore        | Event is called when scorll to bottom of timeline |
   | PUSH_ROUTE | handleEncounterSelect | Event is called when select encounter             |

## Example

### Request
 - pathname: `/embeded-widget/patient-info/encounter-timeline/0debf275-d585-4897-a8eb-25726def1ed5` 

### Action
 - Scroll to bottom of timeline

### Response
```json
{
    "message": "handleLoadMore",
    "params": {
        "filter": {

            "patientId": "0debf275-d585-4897-a8eb-25726def1ed5",
            "periodStart_lt": Sat Sep 17 2016 10:39:53 GMT+0700 (Indochina Time),
        },
        "max": 10
    },
    "eventType": "embedded-widget"
}
```
