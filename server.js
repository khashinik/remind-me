require('dotenv').config();
var twilio = require('twilio');
var moment = require('moment');
var keys = require('./keys.js');

const mailjet = require ('node-mailjet')
    .connect(keys.mailjet.publicID, keys.mailjet.secretID)
    console.log(keys.mailjet.publicID, keys.mailjet.secretID)

moment().format();
 
// Find your account sid and auth token in your Twilio account Console.
var client = new twilio(keys.twilio.client_ID, keys.twilio.clientSecret)
 

var timeA = moment('2018-07-28 11:09:00 AM', 'YYYY-MM-DD hh:mm:ss a')

var tmr = setInterval(()=>{
  var now = moment().unix();
  var then = timeA.unix();
  console.log(now, then)
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

const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
                {
                        "From": {
                                "Email": "projectremindmeservices@gmail.com",
                                "Name": "Remind Me"
                        },
                        "To": [
                                {
                                        "Email": "",
                                        "Name": ""
                                }
                        ],
                        "Subject": "Your alert Request!",
                        "TextPart": "If you see this, the e-mail API works!",
                        "HTMLPart": "If you see this, the e-mail API works!"
                }
        ]
    })
request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })