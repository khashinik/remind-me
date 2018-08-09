var path = require("path");
var model = require("../models");
var twilio = require('twilio');
var moment = require('moment');
var keys = require('../keys.js');



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
  res.redirect(200, "/public/record.html");
  res.end();

})

app.post("/api/createreminder", function(req, res){
  model.reminders.create(req.body).then(function(dbPost){
    res.json(dbPost);
  })
})

app.post("/api/sendreminder", function(req, res){
console.log("twi clien ID: " + keys.twilio.client_ID);
var twilClient = new twilio(keys.twilio.client_ID, keys.twilio.clientSecret);

  var timeA = moment(req.body.deliveryDate + ", " +req.body.deliveryTime);
  console.log("delivery Time: " + req.body.deliveryTime);
var tmr = setInterval(()=>{
  var now = moment().unix();
  var then = timeA.unix();
  var phoneNum = "1" + req.body.userNumber;
  var message = req.body.message;
  console.log(now, then)
  if (now == then) {
    twilClient.messages.create({
        to: phoneNum,
        from: '16474902662',
        body: message
      }).then(message => console.log(message.sid))
      .done();
    
      clearInterval(tmr);
      console.log('Check your text fool!');      
  }
}, 1000);


})
app.get("/api/reminders/:userID", function(req, res){
  // model.reminders.findAll({
  //   where: {
  //     id: req.params.id
  // })
  // var query = {};
  //   if (req.param.id) {
  //     query.id = req.param.id;
  //   }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    // console.log("req: " + JSON.stringify(req.params));
    model.reminders.findAll({
      where: {
        userID: req.params.userID
      }
    }).then(function(dbPost) {
      // console.log(dbPost);
      res.json(dbPost);
      res.end();
    });
  });
}

