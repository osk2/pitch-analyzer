const exec = require('child_process').execSync;
const express = require('express');
const fs = require('fs');
const app = express();
const config = {
  projectName: 'pitch-analyzer',
  praatPath: function () { return '/var/www/' + this.projectName + '/praat/'},
  sampleFilename: 'sample'
};

const analyzePitch = (filename) => {
  const path = '/var/www/' + config.projectName + '/upload/' + file;
  // Extract pitch and intensity from wav
  exec('praat --run ' + config.praatPath + 'extractPitchIntensity.praat "' + config.praatPath + '" "' + path + '"', {stdio:[0,1,2]});
  // Analyze pitch and intensity from output
  exec('praat --run ' + config.praatPath + 'pitchIntensityScript.praat "' + config.praatPath + '" "' + path + '"', {stdio:[0,1,2]});
  const data = fs.readFileSync('upload/' + filename + '.graph', { encoding : 'utf8'});
  const options = {
    delimiter: ',',
    quote: '"'
  };
  return csvjson.toColumnArray(data, options);
}

app.use(express.static('public'));
app.use(express.bodyParser({uploadDir:'./'}));

app.post('/upload', (req, res) => {
  const tmp_path = req.files.audio.name;
  const target_path = '/var/www/' + config.projectName + '/upload/';
  const fileReader = new FileReader();

  fileReader.readAsArrayBuffer(blob);
  fileReader.onload = function () {
    const date = new Date();
    const filename = date.getTime() + '.wav';

    fs.writeFileSync(target_path + filename, Buffer(new Uint8Array(this.result)));
    res.json({success: true, file: filename});
  };
});

app.get('/analyze/:filename', (req, res) => {
  res.json(analyzePitch(req.params.filename));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});