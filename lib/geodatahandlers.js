var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

var handlers = {};

/* End-Point: /getAllPgSQLPoints */
handlers.getAllPgSQLPoints = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

/* End-Point: /getAllPgSQLLines */
handlers.getAllPgSQLLines = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

/* End-Point: /getAllPgSQLPolygons */
handlers.getAllPgSQLPolygons = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

module.exports = handlers;
