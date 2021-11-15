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

workers.checkAccessTokens = function(){
  var _ctimestamp = new Date().valueOf();
  _data.list('tokens',function(err, tokens){
    if(!err && tokens && tokens.length > 0){
      tokens.forEach(function(token){
        _data.read('tokens', token, function(err, originalTokenData){
          if(!err && originalTokenData){
            if(parseInt(_ctimestamp) > parseInt(originalTokenData.expires)){
              _data.delete('tokens', token, function(err){
                if(!err){
                  return;
                }
              });
            }
          } else {
            _data.delete('tokens', token, function(err){
              if(!err){
                return;
              }
            });
          }
        });
      });
    } else {
      return;
    }
  });
};

workers.checkAccessTokensLoop = function(){
  setInterval(function(){
    workers.checkAccessTokens();
  }, 1000 * 60 * 1);
};

workers.init = function(){
  workers.checkAccessTokens();
  workers.checkAccessTokensLoop();
  console.log('\x1b[33m%s\x1b[0m','Background workers are running');
};

module.exports = workers;
