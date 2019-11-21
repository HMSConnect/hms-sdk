
const fs = require('fs');
const path = require('path');
const ndjson = require('ndjson');
const minimongo = require('minimongo');
const LocalDb = minimongo.MemoryDb;

const patientService = require('./services/patient');
const encounterService = require('./services/encounter');
const carePlanService = require('./services/care_plan');

module.exports = (function(){
    let domainResourceList = [];
    let fileDomainRes = [];

    // Create local db (in memory database with no backing)
    let db = new LocalDb();
    
    let currentDirPath = path.join(__dirname, `/mock/standards/smart_fhir`);

    let getSmartFHIRFilePath = function(domain_resource){
        return path.join(__dirname, `/mock/standards/smart_fhir/${domain_resource}`);
    };

    return {

        db: db,

        domainResourceList: domainResourceList,

        fileDomainRes: fileDomainRes,

        getDB: function(){
            return this.db;
        },

        getDomainNameResourceList: function(){
            return this.domainResourceList;
        },

        getDomainResourceFile: function(){
            return this.fileDomainRes;
        },

        loadMockSmartFHIRData: function(callback, onLoadded){
            // console.log('fileDomainRes:', this.fileDomainRes)
            let self = this
            this.fileDomainRes.map((dRes, dIndex) => {
                let path = getSmartFHIRFilePath(dRes);
                fs.createReadStream(path)
                .pipe(ndjson.parse())
                .on('data', function(obj) {
                    if(typeof callback === 'function') {
                        callback(dRes, obj)
                    }
                })
                .on('end', function(){
                    if(dIndex === self.fileDomainRes.length - 1 && onLoadded){
                        onLoadded()
                    }
                })
            });
        },

        setupStorage: function(){
            fs.readdirSync(currentDirPath).forEach((fnameWithExt) => {
                let filePath = path.join(currentDirPath, fnameWithExt);
                let stat = fs.statSync(filePath);
                
                if (stat.isFile()) {
                    let [fObj,, expansion] = fnameWithExt.split('.');
                    let domainNameRes = null
                    if(expansion === "ndjson")
                        domainNameRes = fObj

                    if(domainNameRes){
                        // console.log(domainNameRes);
                        if(this.domainResourceList.indexOf(domainNameRes)<=-1) {
                            this.domainResourceList.push(domainNameRes);
                            this.fileDomainRes.push(fnameWithExt);
                            this.db.addCollection(domainNameRes);
                        }
                    }
                }
            })
        },

        processingPredata: function(domainName, data){
            // use predata before insert to database for query from minimongo
            switch (domainName) {
                case 'patient':
                    return patientService.processingPredata(data);
                case 'encounter':
                    return encounterService.processingPredata(data);
                case 'care_plan':
                    return carePlanService.processingPredata(data)
                default:
                    return data;
            }
        }
    }
})()
