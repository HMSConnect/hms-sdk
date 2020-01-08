# Patient Info

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/patient-info/:patientId`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/:patientId` url to your iframe project.

## Request HTTP GET
**Params**
| Key       | Type/Format | Description             |
| --------- | ----------- | ----------------------- |
| patientId | string      | `required` ID of patient |

**Query Params**
| Key          | Type/Format | Default | Description      |
| ------------ | ----------- | ------- | ---------------- |
| menuNavigate | string      | 10      | Name of sidemenu |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)

- **Avaliable Response**
   | Action     | Message               | Description                           |
   | ---------- | --------------------- | ------------------------------------- |
   | -          | handleNavigateChange  | Event is called when select sidemenu  |
   | PUSH_ROUTE | handleEncounterSelect | Event is called when select encounter |
## Example

### Request
 - pathname: `/embedded-widget/patient-info/0debf275-d585-4897-a8eb-25726def1ed5` 

### Action
 - Select side menu `encounter`

### Response
```json
{
    "message": "handleNavigateChange",
    "params": {
        "menuNavigate": "encounter"
    },
    "path": "/embedded-widget/patient-info/0debf275-d585-4897-a8eb-25726def1ed5?menuNavigate=encounter",
    "eventType": "embedded-widget",
}
```
