# Patient Demographic
If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/patient-info/patient-demographic`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/patient-demographic` url to your iframe project.

## Redux Structure
**Redux Store**
Store name is `patientEncounterTimeline`
| Key       | Type/Format | Default | Description                                            |
| --------- | ----------- | ------- | ------------------------------------------------------ |
| patientId | string      | -       | Patient identification for fetch `patient information` |
**Redux Action**
| Action               | Parameters | Description                  |
| -------------------- | ---------- | ---------------------------- |
| INIT_PATIENT_SUMMARY | any        | Initial Store for fetch data |

## Request HTTP GET
**Query Params**
| Key       | Type/Format | Default | Description              |
| --------- | ----------- | ------- | ------------------------ |
| patientId | string      |         | `required` ID of patient |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/patient-demographic?patientId=0debf275-d585-4897-a8eb-25726def1ed5` 
