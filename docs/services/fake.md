# **Fake data service**

Fake data service or sandbox provides same data schema as our service in real-world. Now we have 2-sources :

## **1.1. HMSConnect**

We are not allow any user to access our resources directly, it is user's privacy issue. So we provided micro-service to serve mock HMSConnect data standard via port number `3002` (refer to `docker-compose.[YOUR_ENV].yml`). 

For simple fake data service provider (`sandbox`) :

```js
// Ex. fake_server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

const port = process.env.FAKE_PORT || 3002;

app.use(cors());

app.get('/:domain_resource', (req, res) => {
    try {
        let fPath = path.join(__dirname, `/mock/standards/hms_connect/${req.params.domain_resource}.json`);
        if (fs.existsSync(fPath)) {
            res.sendFile(fPath);
        }
    } catch(err) {
        console.error(err)
        res.json({ error:err, data:null })
    }
})

app.listen(port, function(){
  console.log(`Providing fake patient data via port ${port}!`)
});
```

In source code of each widget, you just set your target endpoint of the API to :

```javascript
// Ex. your_widget.js

// ...
sanboxEndpoint = `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/patient`;
// ...
```

After that your `app` should set environment in `.env.[YOUR_ENVIRONMENT]` by refer to the `sandbox`:

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


In your widget, you can change your endpoint from `patient` to be the domain resources (above) in `lowercase` string :

```javascript
// Ex. your_widget.js
    
// Change from
sanboxEndpoint = `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/patient`;

// Change to
sanboxEndpoint = `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/encounter`;
```

Calling the API :

```js
// Ex. calling HMS sandbox via "axios" framework

    axios({
        method: 'GET',
        url: sanboxEndpoint, data: null,
        withCredentials: false, 
        json: true,
        headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        // Do something
    }).catch(err => {
        // Warning
    });
```

?> **note** : We may change the data schema any time in the future. Please check the data schema in ["Data schema"](/introduction/data_schema) topic or subscribe us.

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

!> **IMPORTANT** :
<br/> Please be aware FHIR version, they provide FHIR many version :
<br/> - R2 (DSTU2)
<br/> - R3 (STU3)
<br/> - R4 (STU3)

Your component should be classified FHIR version correctly.

?> For more detail : please refer to https://dev.smarthealthit.org/