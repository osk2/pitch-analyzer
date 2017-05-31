# pitch-analyzer

Help people practicing pronunciation

<p>
  <img src="screenshot-index.png" width="30%">
  <img src="screenshot-challenge.png" width="30%">
</p>

## Prerequirement

### Praat

Make sure `Praat` is installed, this can be done by following command on Ubuntu

```
apt-get install praat
```

### Permission

Make sure [`/public/upload`](/public/upload) is writeable, permission `664` is recommended.

## Installation

```
npm install
```

## Usage

```
node .
```

## Note

### Add Questions

You have to upload your own questions at `/upload.html` first.

### SSL

Server must enable SSL due to security policy of WebRTC.

Copy all SSL-related files into [`/ssl`](/ssl), you may want to change path listed below at [index.js](https://github.com/osk2/pitch-analyzer/blob/80293e128659c8f53d95717de7abd9259f90bda4/index.js#L12-L14).

```js
...
const config = {
  praatScript: __dirname + '/praat-script/',
  uploadPath: 'public/upload/',
  ca: 'ssl/fullchain.pem',
  key: 'ssl/privkey.pem',
  cert: 'ssl/cert.pem'
};
...
```

### Port

Server will listen on port 3000 by default


## License

This project is licensed under the MIT license.

please read [LICENSE](LICENSE) for more detail.


### Praat Script

The Praat [scripts](/praat-script) were taken from [monikaUPF/PraatontheWeb](https://github.com/monikaUPF/PraatontheWeb).
