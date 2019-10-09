# **Fake data service**

## **1.1. HMSConnect**

   We are not allow any user to access our resources directly, it is user's privacy issue. So we provided micro-service to serve mock HMSConnect data standard via port number `3002`. In source code, you just set your target endpoint of API to :

```javascript
// Ex. your_widget.js
    // ...
    sanboxEndpoint = `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/patient`;
    // ...
```

In `.env.[YOUR_ENVIRONMENT]`:

```
HMS_SANDBOX_PORT=:3002
HMS_SANDBOX_URL=http://localhost
```

For the other example domain resources except `patient`, we provide :
 - [allergy](https://github.com/HMSConnect/hms-widget-sdk/blob/master/fake/mock/standards/hms_connect/allergy.json)
 - [condition](https://github.com/HMSConnect/hms-widget-sdk/blob/master/fake/mock/standards/hms_connect/condition.json)
 - [encounter](https://github.com/HMSConnect/hms-widget-sdk/blob/master/fake/mock/standards/hms_connect/encounter.json)
 - [practitioner](https://github.com/HMSConnect/hms-widget-sdk/blob/master/fake/mock/standards/hms_connect/practitioner.json)
 - [procedure](https://github.com/HMSConnect/hms-widget-sdk/blob/master/fake/mock/standards/hms_connect/procedure.json)

 In your widget, you can change endpoint from `patient` to be keyword above in `lowercase` string :

```javascript
// Ex. your_widget.js
    
    // Change from
    sanboxEndpoint = `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/patient`;
    
    // Change to
    sanboxEndpoint = `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/encounter`;
```

## **1.2. SmartFHIR**

They have already provided sandbox in their website. You can access via `https://[FHIR_VERSION].smarthealthit.org/Patient/[MOCK_DATA_WITH_USER_ID]`. We suggest you to find user's ID from link below to use in your development environment:

```bash
# Ex. List of patient of FHIR version 2 (R2 or DSTU2)
https://patient-browser.smarthealthit.org/index.html?config=r2#/
```

In source code, you just call via example endpoint below:

```javascript
// Ex. your_widget.js
    // ...
    sanboxEndpoint = 'https://r2.smarthealthit.org/Patient/bd7cb541-732b-4e39-ab49-ae507aa49326';
    // ...
```

**IMPORTANT** :

Please be aware FHIR version, they provide FHIR many version :
 - R2 (DSTU2)
 - R3 (STU3)
 - R4 (STU3)

Your component should be classified FHIR version correctly.

?> For more detail : please refer to https://dev.smarthealthit.org/