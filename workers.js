var _data = require('./data');
var helpers = require('./helpers');
var util = require('util');
var debug = util.debuglog('workers');

var workers = {};

workers.checkTokensValidity = function(){
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

workers.checkSessionsValidity = function(){
  var _ctimestamp = new Date().valueOf();
  _data.list('sessions',function(err, sessions){
    if(!err && sessions && sessions.length > 0){
      sessions.forEach(function(session){
        _data.read('sessions', session, function(err, originalSessionData){
          if(!err && originalSessionData){
            if(parseInt(_ctimestamp) > parseInt(originalSessionData.expires)){
              _data.delete('sessions', session, function(err){
                if(!err){
                  return;
                }
              });
            }
          } else {
            _data.delete('sessions', session, function(err){
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

workers.checkCaptchasValidity = function(){
  var _ctimestamp = new Date().valueOf();
  _data.list('captcha',function(err, captchas){
    if(!err && captchas && captchas.length > 0){
      captchas.forEach(function(_captcha){
        _data.read('captcha', _captcha, function(err, originalCaptchaData){
          if(!err && originalCaptchaData){
            if(parseInt(_ctimestamp) > parseInt(originalCaptchaData.expires)){
              _data.delete('captcha', _captcha, function(err){
                if(!err){
                  return;
                }
              });
            }
          } else {
            _data.delete('captcha', _captcha, function(err){
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

workers.checkTokensValidityLoop = function(){
  setInterval(function(){
    workers.checkTokensValidity();
  }, 1000 * 60 * 60);
};

workers.checkSessionsValidityLoop = function(){
  setInterval(function(){
    workers.checkSessionsValidity();
  }, 1000 * 60 * 30);
};

workers.checkCaptchasValidityLoop = function(){
  setInterval(function(){
    workers.checkCaptchasValidity();
  }, 1000 * 60 * 30);
};



workers.init = function(){
  workers.checkTokensValidity();
  workers.checkSessionsValidity();
  workers.checkCaptchasValidity();
  workers.checkTokensValidityLoop();
  workers.checkSessionsValidityLoop();
  workers.checkCaptchasValidityLoop();
  console.log('\x1b[33m%s\x1b[0m','Background workers are running');
};

module.exports = workers;
