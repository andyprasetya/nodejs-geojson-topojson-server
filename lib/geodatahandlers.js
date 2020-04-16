var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

var handlers = {};

/* End-Point: /getAllPoints */
handlers.getAllPoints = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

/* End-Point: /getAllLines */
handlers.getAllLines = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

/* End-Point: /getAllPolygons */
handlers.getAllPolygons = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

/* End-Point: /getAllMySQLPoints */
handlers.getAllMySQLPoints = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

module.exports = handlers;
