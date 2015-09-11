var assert = require('assert');
var qs = require('querystring');

/* jshint mocha: true */

describe('gmaps-signature', function() {

  var GS = require('..');

  describe('#sign', function() {
    after(function() {
      // Reset config
      GS.GOOGLE_API_KEY = '';
      GS.GMAPS_CLIENT_ID = '';
      GS.GMAPS_PRIVATE_KEY = '';
    });

    it('return same url', function() {
      GS.GMAPS_CLIENT_ID = 'clientID';

      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=New+York';
      assert.equal(GS.sign(url), url, 'doesn\'t change when there\'s no key');
    });

    it('adds google key', function() {
      GS.GOOGLE_API_KEY = 'GOOGLE_KEY';

      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=New+York';
      assert.equal(GS.sign(url), url + '&key=' + GS.GOOGLE_API_KEY, 'add\s google api key');
    });

    it('should sign correctly', function() {
      // @see https://developers.google.com/maps/documentation/business/webservices/auth
      GS.GMAPS_CLIENT_ID = 'clientID';
      GS.GMAPS_PRIVATE_KEY = 'vNIXE0xscrmjlyV-12Nj_BvUPaw=';

      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=New+York';
      var signed = GS.sign(url);
      var signature = 'chaRF2hTJKOScPr-RQCEhZbSzIE=';

      assert.ok(signed.indexOf('signature') > -1, 'contains a signature');

      var generatedSignature = signed.split('signature=')[1];

      assert.equal(generatedSignature, encodeURIComponent(signature), 'contains expected signature');

      var expected = url + '&' + qs.stringify({ 'client': GS.GMAPS_CLIENT_ID, 'signature':  signature });
      assert.equal(signed, expected, 'url is as expected');
    });

    it('should escape correctly', function() {
      GS.GMAPS_CLIENT_ID = 'clientID';
      GS.GMAPS_PRIVATE_KEY = 'vNIXE0xscrmjlyV-12Nj_BvUPaw=';

      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=New+York+City';
      var signed = GS.sign(url);
      var signature = 'r-n4bzIhWIAZHtpPTGIM-vO-QfY='; // 3 dashes

      var generatedSignature = signed.split('signature=')[1];

      assert.equal(generatedSignature, encodeURIComponent(signature), 'contains expected signature');

      var expected = url + '&' + qs.stringify({ 'client': GS.GMAPS_CLIENT_ID, 'signature':  signature });
      assert.equal(signed, expected, 'url is as expected');
    });
  });
});
