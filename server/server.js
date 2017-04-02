const https  = require('https');
const fs     = require('fs');
const static = require('node-static');
const file   = new static.Server({
    'Access-Control-Allow-Origin': '*'
});

const options = {
    key: fs.readFileSync('client-key.pem'),
    cert: fs.readFileSync('client-cert.pem')
};

const a = https.createServer(options, function(req, res) {
    file.serve(req, res);
}).listen(8000);