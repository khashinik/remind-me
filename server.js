
require("dotenv").config();
var twilio = require('twilio');
var moment = require('moment');
var express = require('express');
var parser = require('body-parser');
const morgan = require('morgan');
const { OAuth2Client } = require('google-auth-library');
var db = require('./models');

var keys = require('./keys.js');

const oauthClientId = keys.google.client_ID;

var app = express();

const client = new OAuth2Client(oauthClientId);

var PORT = process.env.PORT || 3000;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(morgan('combined'));

app.use(express.static(__dirname + "/public"));



function validateReq(req, res, next) {
  if (!req.get('Authorization')) {
      res.status(400).send("Authorization header is required");
  }
  const id_token = req.get('Authorization').substring("Bearer ".length);
  if (!id_token) {
      res.status(400).send("Id token is required");
  }

  client.verifyIdToken({
      idToken: id_token,
      audience: oauthClientId
  }, (err, loginTicket) => {
      if (err) {
          res.status(401).send("ID token is invalid");
      }

      const payload = loginTicket.getPayload();
      req.userContext = payload;
      next();
  });
}

app.use("/api/v1/*", validateReq);



require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("Get yourself connected on port: "+ PORT);
      })
})


const mailjet = require ('node-mailjet')
    .connect(keys.mailjet.publicID, keys.mailjet.secretID)
    // console.log(keys.mailjet.publicID, keys.mailjet.secretID)
moment().format();
 
// Find your account sid and auth token in your Twilio account Console.
var twilClient = new twilio(keys.twilio.client_ID, keys.twilio.clientSecret);


var timeA = moment('2018-07-28 11:09:00 AM', 'YYYY-MM-DD hh:mm:ss a')

var tmr = setInterval(()=>{
  var now = moment().unix();
  var then = timeA.unix();
  // console.log(now, then)
  if (now == then) {
    twilClient.messages.create({
        to: '',
        from: '16474902662',
        body: 'The text service works!'
      });
      clearInterval(tmr);
      console.log('Check your text fool!');      
  }
}, 1000);

var fromEmail = "projectremindmeservices@gmail.com";
var fromName = "Remind Me Alert";
var toEmail = "";
var toName = "";
var mailSubject = "Your alert request!";
var mailTextpart = "";

const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
                {
                        "From": {
                                "Email": fromEmail,
                                "Name": fromName
                        },
                        "To": [
                                {
                                        "Email": toEmail,
                                        "Name": toName
                                }
                        ],
                        "Subject": mailSubject,
                        "TextPart": mailTextpart,
                        "HTMLPart": ""
                }
        ]
    })
request
    .then((result) => {
        console.log("results: " + result.body)
    })
    .catch((err) => {
        console.log("error: " + err.statusCode)
    })

