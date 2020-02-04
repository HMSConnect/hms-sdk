# Patient Demographic
If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/patient-demographic`

## Setup this widget to iframe
Replace `/embedded-widget/patient-demographic` url to your iframe project.

## Request HTTP GET
**Query Params**
| Key         | Type/Format | Default | Description                |
| ----------- | ----------- | ------- | -------------------------- |
| patientId   | string      |         | `required` ID of patient   |
| encounterId | string      |         | `required` ID of encounter |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)

- **Avaliable Response**
   | Action     | Message               | Description                           |
   | ---------- | --------------------- | ------------------------------------- |
   | PUSH_ROUTE | handleEncounterSelect | Event is called when select encounter |

## Example

### Request
 - pathname: `/embedded-widget/patient-demographic?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af` 

### Action
 - Select encounter id 

### Response
```json
{
    "action": "PUSH_ROUTE",
    "message": "handleEncounterSelect",
    "name": "patientDemographicEncounterTimeline",
    "params": {
        "encounterId":"o2-3898f0f9-385e-478d-be25-5f05719e80af",
        "patientId": "0debf275-d585-4897-a8eb-25726def1ed5"
    },
    "path": "/embedded-widget/patient-demographic?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=o2-3898f0f9-385e-478d-be25-5f05719e80af",
    "eventType": "embedded-widget",
}
```
