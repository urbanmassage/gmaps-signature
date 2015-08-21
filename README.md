# Google Maps Signature
[![Circle CI](https://circleci.com/gh/louy/gmaps-signature.svg?style=svg)](https://circleci.com/gh/louy/gmaps-signature)

Signs Google Maps requests. Works with both general and Google Maps for Work.

## Installation

With npm...

`npm install --save gmaps-signature`

## Usage
    var GS = require('gmaps-signature');

    GS.GOOGLE_API_KEY = 'MY KEY';
    // Or for Google Maps API for Work
    GS.GMAPS_CLIENT_ID = 'MY CLIENT ID';
    GS.GMAPS_PRIVATE_KEY = 'MY PRIVATE KEY';

    // and then...
    var url = GS.sign('https://maps.googleapis.com/maps/api/geocode/json?address=New+York');
