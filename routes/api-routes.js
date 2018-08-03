var path = require("path");
var model = require("../models")

module.exports = function (app) {

app.get('/auth/google/callback', function(req, res){
  console.log("Auth Callback");

});

app.post('/api/userpresent', function(req, res){
  console.log(req.body);

  // var doesExist;

  model.Users.findById(req.body.id).then(function(results) {
    console.log(results);
    // res.json(results);
    if(!results){
      model.Users.create({
        userID: req.body.id,
        userName: req.body.uName,
        userEmail: req.body.email,
        userPhoto: req.body.photo
      })
    }
  });
  // res.sendFile("doesExist");
  res.sendFile(path.join(__dirname, "../public/Authenticated.html"));
  res.end();

})
}