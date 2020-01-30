# Patient Demographic
If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/patient-info/:patientId/encounter/:encounterId/patient-demograhpic`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/:patientId/encounter/:encounterId/patient-demograhpic` url to your iframe project.

## Request HTTP GET
**Params**
| Key         | Type/Format | Description                |
| ----------- | ----------- | -------------------------- |
| patientId   | string      | `required` ID of patient   |
| encounterId | string      | `required` ID of encounter |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)

- **Avaliable Response**
   | Action     | Message               | Description                           |
   | ---------- | --------------------- | ------------------------------------- |
   | PUSH_ROUTE | handleEncounterSelect | Event is called when select encounter |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/0debf275-d585-4897-a8eb-25726def1ed5/encounter/3898f0f9-385e-478d-be25-5f05719e80af/patient-demograhpic` 

### Action
 - Select encounter id 

### Response
```json
{
    "action": "PUSH_ROUTE",
    "message": "handleEncounterSelect",
    "name": "patientDemographicEncounterTimeline",
    "params": {
        "encounterId":"o1-3898f0f9-385e-478d-be25-5f05719e80af",
        "patientId": "0debf275-d585-4897-a8eb-25726def1ed5"
    },
    "path": "/embedded-widget/patient-info/0debf275-d585-4897-a8eb-25726def1ed5/encounter/o1-3898f0f9-385e-478d-be25-5f05719e80af/patient-demograhpic",
    "eventType": "embedded-widget",
}
```
