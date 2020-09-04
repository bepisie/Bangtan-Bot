var getSteamID64 = require('./lib/steamid64');

var username = 'yllanos';
var baseURL = "http://steamcommunity.com/id/";
var URL = baseURL + username +  "/?xml=1";

/**
 * Test function that requires main script and logs to console some sample SteamID64
 * If you want to test a different user, just edit the 'username' variable as needed
 * 'result' variable represents the value to be integrated into your application
 * @param {string} URL - Full URL profile for specific user.
 */
getSteamID64(URL)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (reason) {
    console.error("%s; %s", reason.error.message, reason.options.url);
    console.log("%j", reason.response.statusCode);
    return reason.error.message;
  });
