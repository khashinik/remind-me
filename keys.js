exports.twilio = {
    client_ID: process.env.twilioClientID,
    clientSecret: process.env.twilioSecret
}

exports.google = {
    client_ID: process.env.gClientID,
    clientSecret: process.env.gClientSecret,
    callBackURL: process.env.gCBURI

}
console.log("keys loaded");