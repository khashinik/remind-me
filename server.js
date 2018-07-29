require("dotenv").config();
var twilio = require('twilio');
var moment = require('moment');
var express = require('express');
var parser = require('body-parser');
var routes = require('./controllers/rmcontroller.js');
var keys = require('./keys.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(express.static("public"));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// app.use(routes);
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);



app.listen(PORT, function(){
  console.log("Get yourself connected on port: "+ PORT);
})

moment().format();
 
// Find your account sid and auth token in your Twilio account Console.
var client = new twilio(keys.twilio.client_ID, keys.twilio.clientSecret);
 

var timeA = moment('2018-07-26 8:56:00 PM', 'YYYY-MM-DD hh:mm:ss a')

var tmr = setInterval(()=>{
  var now = moment().unix();
  var then = timeA.unix();
  // console.log(now, then)
  if (now == then) {
    client.messages.create({
        to: '',
        from: '16474902662',
        body: 'The text service works!'
      });
      clearInterval(tmr);
      console.log('Check your text fool!');      
  }
}, 1000);

