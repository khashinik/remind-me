var path = require("path");
const passport = require('passport'),
     auth = require('../auth/auth.js');
auth(passport);

module.exports = function (app) {
    // app.get("/auth/google", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/authenticated.html"));
    // });

    app.use(passport.initialize());
    
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '../public/authenticated.html',
            failureRedirect: '/'
        }),
        (req, res) => {
            res.sendFile(path.join(__dirname, "../public/authenticated.html"));
        }
    );




}