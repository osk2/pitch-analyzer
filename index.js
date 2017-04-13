const exec = require('child_process').execSync;
const express = require('express');
const https = require('https');
const csvjson = require('csvjson');
const fs = require('fs');
const app = express();
const config = {
  projectName: 'pitch-analyzer',
  praatPath: function () { return '/var/www/' + this.projectName + '/praat/'},
  sampleFilename: 'sample',
  uploadPath: 'upload/',
  ca: 'ssl/ca_bundle.crt',
  key: 'ssl/private.key',
  cert: 'ssl/certificate.crt'
};
const sslOptions = {
  ca: fs.readFileSync(config.ca),
  key: fs.readFileSync(config.key),
  cert: fs.readFileSync(config.cert)
};

const analyzePitch = (filename) => {
  const filePath = '/var/www/' + config.projectName + '/upload/';
  const praatPath = config.praatPath();

  exec('praat --run ' + praatPath + 'extractPitchIntensity.praat "' + filePath + '" "' + filename + '"', {stdio:[0,1,2]});
  exec('praat --run ' + praatPath + 'pitchIntensityScript.praat "' + filePath + '" "' + filename + '"', {stdio:[0,1,2]});
  const data = fs.readFileSync('upload/' + filename + '.graph', { encoding : 'utf8'});
  return csvjson.toColumnArray(data, {
    delimiter: '\t',
    quote: '"'
  });
}

app.use(express.static('public'));
app.post('/upload', (req, res) => {
  const date = new Date();
  const filename = date.getTime() + '.wav';

  req.pipe(fs.createWriteStream(config.uploadPath + filename))
    .on('error', (e) => res.status(500).json({success: false, message: e.message}).end())
    .on('close', () => res.json({success: true, file: date.getTime()}))
});

app.get('/analyze/:filename', (req, res) => {
  res.json(analyzePitch(req.params.filename));
});

https.createServer(sslOptions, app).listen(3000, function() {
  console.log('Listening on port 3000');
});

