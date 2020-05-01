var path = require('path');
var fs = require('fs');
var _data = require('./data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var url = require('url');
var util = require('util');
var debug = util.debuglog('workers');

var workers = {};

workers.init = function(){
  console.log('\x1b[33m%s\x1b[0m','Background workers are running');
};

module.exports = workers;
