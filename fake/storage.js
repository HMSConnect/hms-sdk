
const fs = require('fs');
const path = require('path');
const ndjson = require('ndjson');
const minimongo = require("minimongo");
const LocalDb = minimongo.MemoryDb;


module.exports = function(){
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

        loadMockSmartFHIRData: function(callback){
            console.log('fileDomainRes:', this.fileDomainRes)
            this.fileDomainRes.map((dRes, dIndex) => {
                let path = getSmartFHIRFilePath(dRes);
                fs.createReadStream(path)
                .pipe(ndjson.parse())
                .on('data', function(obj) {
                    if(typeof callback === 'function') {
                        callback(dRes, obj)
                    }
                })
            });
        },

        setupStorage: function(){
            fs.readdirSync(currentDirPath).forEach((fnameWithExt) => {
                let filePath = path.join(currentDirPath, fnameWithExt);
                let stat = fs.statSync(filePath);
                
                if (stat.isFile()) {
                    let fObj = fnameWithExt.split('.');
                    let domainNameRes = fObj.length>1?fObj[0]:null;

                    if(domainNameRes){
                        console.log(domainNameRes);
                        if(this.domainResourceList.indexOf(domainNameRes)<=-1) {
                            this.domainResourceList.push(domainNameRes);
                            this.fileDomainRes.push(fnameWithExt);
                            this.db.addCollection(domainNameRes);
                        }
                    }
                }
            })
        },

        // loadMockSmartFHIRData(function(key, data){
        //     let fObj = key.split('.');
        //     let domainNameRes = fObj.length>1?fObj[0]:null;

        //     if(domainNameRes){
        //         db[domainNameRes].upsert(data, function() {
        //             console.log(`Upsert to ${domainNameRes} :`, data)
        //         });
        //     }
        // })
    }
}
