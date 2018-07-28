exports.twilio = {
    client_ID: process.env.twilioClientID,
    clientSecret: process.env.twilioSecret
}

exports.mailjet = {
    publicID: process.env.MJ_APIKEY_PUBLIC,
    secretID: process.env.MJ_APIKEY_PRIVATE
}

console.log("keys loaded");