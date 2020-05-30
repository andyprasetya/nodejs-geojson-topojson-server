var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

var handlers = {};

/* End-Point: /getAllPoints */
handlers.getAllMySQLPoints = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

/* End-Point: /getAllLines */
handlers.getAllMySQLLines = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

/* End-Point: /getAllPolygons */
handlers.getAllMySQLPolygons = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

module.exports = handlers;
