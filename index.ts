var crypto = require('crypto');
var qs = require('querystring');
var debug = require('debug')('gmaps-signature');

function signGMapsRequest(url: string): string {
  var GKEY = this.GOOGLE_API_KEY;

  var CID = this.GMAPS_CLIENT_ID;
  var PKEY = this.GMAPS_PRIVATE_KEY;

  var s = url.indexOf('?') > -1 ? '&' : '?';

  if (!CID || !PKEY) { // Not Google Maps for Work
    if (GKEY) {
      debug('Adding gmaps key', GKEY);
      url += s + qs.stringify({ 'key': GKEY });
    } else {
      debug('No keys were provided');
    }

    return url;
  }

  debug('Adding Google Maps for Work key', CID);

  url += s + qs.stringify({ 'client': CID });

  var host = url.replace(/(^[^\/]*\/\/[^\/]+)(\/.*$)/, '$1');
  var path = url.substr(host.length);

  // https://developers.google.com/maps/documentation/business/webservices/auth

  // decode key
  var key = new Buffer(PKEY.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

  // generate signature
  var signature = crypto.createHmac('sha1', key).update(path).digest('base64');

  // encode signature
  signature = signature.replace(/\+/g, '-').replace(/\//g, '_');

  return url + '&' + qs.stringify({ 'signature': signature });
}

export interface Instance {
  sign(url: string): string;
  GOOGLE_API_KEY: string;
  GMAPS_CLIENT_ID: string;
  GMAPS_PRIVATE_KEY: string;
}

export function create(): Instance {
  // Returns a new instance.
  return {
    sign: signGMapsRequest,
    GOOGLE_API_KEY: null,
    GMAPS_CLIENT_ID: null,
    GMAPS_PRIVATE_KEY: null,
  };
}

const instance = create();

// Use env variables if possible
instance.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
instance.GMAPS_CLIENT_ID = process.env.GMAPS_CLIENT_ID;
instance.GMAPS_PRIVATE_KEY = process.env.GMAPS_PRIVATE_KEY;

export default instance;
