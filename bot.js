'use strict';
const builder = require('claudia-bot-builder'),
      //https = require('https'),
      rp = require('request-promise'),
      slackTemplate = builder.slackTemplate;
/*
var options = {
  host: 'slack.com',
  port: 443,
  path: '/api/users.list?token=xoxp-82614129472-82625675831-175602415734-93899ef773690e8a6daac74408a54389&pretty=1',
  method: 'GET'
};


module.exports = builder((request, apiReq) => {
  https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      //console.log('BODY: ' + chunk);
      const users = new slackTemplate("Room members");
      var userList;
      JSON.parse(chunk).members.forEach(function callback(member, index, array) {
          console.log("Name = " + member.profile.last_name);
          userList = member.profile.last_name + "\n";
      });
      users.addAttachment("").addField("Who", userList, true);
      return users.get();
    });
  }).end();
});
*/

var options = {
  uri: 'https://slack.com/api/users.list',
  qs: {
      token: 'xoxp-82614129472-82625675831-175602415734-93899ef773690e8a6daac74408a54389',
      pretty: '1'
  },
  /*
  headers: {
      'User-Agent': 'Request-Promise'
  },*/
  json: true // Automatically parses the JSON string in the response
};
module.exports = builder((request, apiReq) => {
return rp(options)
    .then(function (chunk) {
        const users = new slackTemplate("Room members");
        var userList = "";
        var timeZones = "";
        chunk.members.forEach(function callback(member, index, array) {
            //console.log("Name = " + member.profile.last_name);
            // Remove this bot from the list (I didn't found a better way to remove it)
            if (member.profile.always_active == null || member.profile.always_active === false) {
              userList = userList+ "\n"+ member.profile.last_name ;
              timeZones = timeZones+ "\n"+ member.tz;
            }
        });
        users.addAttachment("A1")
          .addField("Who", userList, true)
          .addField("TimeZone", timeZones, true);
        return users.get();
      })
    .catch(function (err) {
      return `Unfortunately, could not find anything`;
    });
});
