const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const mockStorage = require('./storage')

const port = process.env.FAKE_PORT || 3002;
let db;

let initService = function(){
    // Prepare data from ".ndjson" files
    mockStorage.setupStorage();

    // Get instance of storage
    db = mockStorage.getDB();
    // Upsert data to the storage
    mockStorage.loadMockSmartFHIRData(function(key, data){
        // console.log(`${key}:`, data)

        let fObj = key.split('.');
        let domainNameRes = fObj.length>1?fObj[0]:null;


        if(domainNameRes){
            // console.log(`Upsert domain resource name "${domainNameRes}"...`)
            db[domainNameRes].upsert(
              mockStorage.processingPredata(domainNameRes, data),
              function() {
                // console.log(`Upsert to ${domainNameRes} :`, data)
              }
            )
        }
    })
}

// -----------------------------------------------
// Setup middleware
app.use(cors());

// -----------------------------------------------
// Initial service
initService();

// -----------------------------------------------
// Serv endpoint
// use router
app.use("/smart_fhir/patient", require('./apis/v1/patient'))


// HMS
app.get('/hms_connect/:domain_resource', (req, res) => {
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

// SmartFHIR
app.get('/smart_fhir/:domain_resource/:id', (req, res) => {
    try {
        // Access the storage here
        if(db[req.params.domain_resource]) {
            db[req.params.domain_resource].findOne({ id:req.params.id }, {}, function(data) {
                // console.log(`${req.params.domain_resource}: ` + data);
                res.json({ error:null, data:data })
            });
        } else {
            res.json({ error:'The domain resource doesn\'t exist', data:null })
        }
    } catch(err) {
        console.error(err)
        res.json({ error:err, data:null })
    }
})

// -----------------------------------------------
// Listening client
app.listen(port, function(){
  console.log(`Providing fake patient data via port ${port}!`)
});

exports.mockStorage = db