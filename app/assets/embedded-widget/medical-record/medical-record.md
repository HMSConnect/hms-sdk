# Medical Record

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/medical-records`

## Setup this widget to iframe
Replace `/embedded-widget/medical-records` url to your iframe project.

## Request HTTP GET
**Query Params**
| Key         | Type/Format | Defatul | Description                |
| ----------- | ----------- | ------- | -------------------------- |
| encounterId | string      | ''      | `required` ID of encounter |
| dimention   | string      | '1xN'   | Dimention of grid panel    |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)

## Example

### Request
 - pathname: `/embedded-widget/medical-records?encounterId=3898f0f9-385e-478d-be25-5f05719e80af&dimention=2xN` 

### Action
 - Select dimention options from `2xn` to `3xn`

### Response
```json
{
    "message": "handleDimentionChange",
    "params": {
        "dimention": "2xN"
    },
    "eventType": "embedded-widget",
}

// params.data is observationList that observationData.title is match with params.tabTitle
```
