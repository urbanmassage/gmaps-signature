# Google Maps Signature
[![Circle CI](https://img.shields.io/circleci/project/urbanmassage/gmaps-signature.svg)](https://circleci.com/gh/urbanmassage/gmaps-signature)
[![NPM](https://img.shields.io/npm/v/gmaps-signature.svg)](https://www.npmjs.com/package/gmaps-signature)
[![Codecov](https://img.shields.io/codecov/c/github/urbanmassage/gmaps-signature.svg)](https://codecov.io/github/urbanmassage/gmaps-signature/)
[![VersionEye](https://www.versioneye.com/nodejs/gmaps-signature/badge.svg)](https://www.versioneye.com/nodejs/gmaps-signature/)

Signs Google Maps requests. Works with both general and Google Maps for Work.

## Installation

With npm...

`npm install --save gmaps-signature`

## Usage

```js
// Load the module
var GS = require('gmaps-signature');

// Add your Google Maps key
GS.GOOGLE_API_KEY = 'MY KEY';
// Or for Google Maps API for Work
GS.GMAPS_CLIENT_ID = 'MY CLIENT ID';
GS.GMAPS_PRIVATE_KEY = 'MY PRIVATE KEY';

// and then you can start signing urls...
var url = GS.sign('https://maps.googleapis.com/maps/api/geocode/json?address=New+York');
```
