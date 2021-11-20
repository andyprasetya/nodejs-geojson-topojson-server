/*
 * Helpers for various tasks
 * */
var config = require('./config');
var crypto = require('crypto');
var https = require('https');
var querystring = require('querystring');

var helpers = {};

helpers.parseJsonToObject = function(str){
  try{
    let obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for(i = 1; i <= strLength; i++) {
      let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      str+=randomCharacter;
    }
    return str;
  } else {
    return false;
  }
};

helpers.fileExtensionType = function(filetype){
  if(filetype == 'application/zip'){
    return '.zip';
  } else {
    return '.dat';
  }
};

helpers.removeSingleQuote = function(rawstring){
  var _string = rawstring;
  var _safeString = _string.replace(/'/g, '@@');
  return _safeString;
};

module.exports = helpers;
