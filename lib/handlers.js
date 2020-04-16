var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

var handlers = {};

handlers.alive = function(data,callback){
  var acceptableMethods = ['get','post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var objDate = new Date();
    var json = {"status":"alive", "datetime":objDate.toISOString()};
    callback(200, json);
  } else {
    callback(405);
  }
};

handlers.version = function(data,callback){
  var acceptableMethods = ['get','post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var json = {"version":config.version, "codename":config.codeName};
    callback(200, json);
  } else {
    callback(405);
  }
};

handlers.notFound = function(data,callback){
  callback(404);
};

handlers.getInitToken = function(data, callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._getInitToken[data.method](data,callback);
  } else {
    callback(405);
  }
}
handlers._getInitToken = {};
handlers._getInitToken.get = function(data,callback){
  let randstr = ''+ data.queryStringObject.inittoken +''+ helpers.createRandomString(32) +'';
  let hashedstr = helpers.hash(randstr);
  let expires = Date.now() + 1000 * 60 * 60;
  let tokenObject = {'token': hashedstr, 'expires': expires};
  _data.create('tokens', hashedstr, tokenObject, function(err){
    if(!err){
      callback(200, tokenObject);
    } else {
      callback(500, {'Error' : 'Could not create the initial token'});
    }
  });
};

module.exports = handlers;
