var crypto = require('crypto');
var qs = require('querystring');

function signGMapsRequest(url) {
  var GKEY = this.GOOGLE_API_KEY;

  var CID = this.GMAPS_CLIENT_ID;
  var PKEY = this.GMAPS_PRIVATE_KEY;

  var s = url.indexOf('?') > -1 ? '&' : '?';

  if( ! CID || ! PKEY ) { // Not Google Maps for Work
    if( GKEY ) {
      // Add gmaps key
      url += s + qs.stringify({ 'key': GKEY });
    }
    return url;
  }

  url += s + qs.stringify({ 'client': CID });

  var host = url.replace(/(^[^\/]*\/\/[^\/]+)(\/.*$)/, '$1');
  var path = url.substr(host.length);

  // https://developers.google.com/maps/documentation/business/webservices/auth

  // decode key
  var key = new Buffer( PKEY.replace('-', '+').replace('_', '/'), 'base64');

  // generate signature
  var signature = crypto.createHmac('sha1', key).update(path).digest('base64');

  // encode signature
  signature = signature.replace('+', '-').replace('/', '_');

  return url + '&' + qs.stringify({ 'signature': signature });
}

function createInstance() {
  // Returns a new instance.
  return {
    sign: signGMapsRequest,
    GOOGLE_API_KEY: null,
    GMAPS_CLIENT_ID: null,
    GMAPS_PRIVATE_KEY: null,
  };
}

var instance = createInstance();
instance.create = createInstance;

module.exports = instance;
