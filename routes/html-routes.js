var path = require("path");
// var express = require('express');
// var router = express.Router();

module.exports = function(app){
    app.get("/", function(req, res){
        res.
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}