var rp = require('request-promise');
var parseString = require('xml2js').parseString;

/**
 * Goes to Steam, fetches the user's XML and then parses it to JSON
 * @param {string} URL - Full URL profile for specific user.
 * @return {string} The steamID64.
 */
module.exports = function getSteamID64(URL) {
  return rp(URL)
    .then(function (xml) {
      return new Promise(function(resolve, reject) {
        parseString(xml, {
          explicitArray : false,
          ignoreAttrs : true,
          trim : true
        }, function(err, result){
          if (err) {
            reject(err);
          } else {
            resolve(result["profile"]["steamID64"]);
          }
        });
      });
    });
}
