const express = require("express");

const app = express();

app.use('/public',express.static('public'));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    	"Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    	"GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.get('/',(req,res,next) => {
    console.log("Got request");
    // res.json({"message":"Loaded"});
    res.sendFile('./public/index.html',{ root: __dirname });
});

module.exports = app;