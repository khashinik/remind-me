const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('../keys.js');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: keys.google.client_ID,
            clientSecret: keys.google.clientSecret,
            callbackURL: keys.google.callBackURL,
            
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};