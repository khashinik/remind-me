var twilio = require('twilio');
var moment = require('moment');
moment().format();
 
// Find your account sid and auth token in your Twilio account Console.
var client = new twilio('', '');
 

var timeA = moment('2018-07-26 8:56:00 PM', 'YYYY-MM-DD hh:mm:ss a')

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