var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

var handlers = {};

/* End-Point: /getAllSQLitePoints */
handlers.getAllSQLitePoints = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

/* End-Point: /getAllSQLiteLines */
handlers.getAllSQLiteLines = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

/* End-Point: /getAllSQLitePolygons */
handlers.getAllSQLitePolygons = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){

  } else {
    callback(405);
  }
};

module.exports = handlers;
