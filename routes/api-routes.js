var path = require("path");

module.exports = function (app) {

app.get('/auth/google/callback', function(){
  console.log("Auth Callback");

});

}