require('dotenv').config();
var express = require('express');
var app = express();
var router = require('./lib/router');

app.use('/'+process.env.APP_ENDPOINT, router);

app.listen(process.env.APP_PORT, function(){
  console.log('\x1b[36m%s\x1b[0m','PDF Printing service is running @port: '+process.env.APP_PORT);
});

module.exports = app;