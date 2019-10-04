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