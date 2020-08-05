var { fork } = require('child_process');
var path = require('path');
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

var handlers = {};

handlers.alive = function(data,callback){
  var acceptableMethods = ['get','post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var forkAlive = fork(path.join(__dirname, config.subModuleDirectory, '/alive.js'));
    forkAlive.send(data);
    forkAlive.on('message', function(childProcessResponse){
      callback(200, childProcessResponse);
    });
  } else {
    callback(405);
  }
};

handlers.version = function(data,callback){
  var acceptableMethods = ['get','post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var forkVersion = fork(path.join(__dirname, config.subModuleDirectory, '/version.js'));
    forkVersion.send(data);
    forkVersion.on('message', function(childProcessResponse){
      callback(200, childProcessResponse);
    });
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

/* End-Point: /doLogin */
handlers.doLogin = function(data,callback){
  var acceptableMethods = ['post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._doLogin[data.method](data, callback);
  } else {
    if(config.envName == 'staging'){
      callback(200);
    } else {
      callback(405);
    }
  }
};
handlers._doLogin = {};
handlers._doLogin.post = function(data, callback){
  if(data.headers.token){
    var _tHeadBuff = new Buffer.from(data.headers.token, 'base64');
    var _tHeadHexIntermediary = _tHeadBuff.toString('hex');
    var _tHeadHex = new Buffer.from(_tHeadHexIntermediary, 'hex');
    var _tHeadStr = _tHeadHex.toString('utf8');
    var _arrToken = _tHeadStr.split('.');
    _data.read('tokens', _arrToken[1], function(err, initialTokenData){
      let _expireTimestamp = parseInt(_arrToken[2]);
      if(!err && initialTokenData.token == _arrToken[1] && initialTokenData.expires > _expireTimestamp){
        let hashedPass = helpers.hash(data.payload.password);
        pgpool.query('SELECT * FROM users WHERE username = $1 AND password = $2 AND status = 1', [data.payload.username, hashedPass], (queryerror, queryresult, fields) => {
          if(queryerror){
            callback(500);
          }
          if(queryresult.length==0){
            callback(405);
          } else {
            let sessionId = helpers.createRandomString(32);
            let expires = Date.now() + 1000 * 60 * 60;
            let response = {}, sessionObject;
            Object.keys(queryresult).forEach(function(key) {
              let row = queryresult[key];
              sessionObject = {
                'status': 201,
                'initialtoken': initialTokenData.token,
                'sessionid': sessionId,
                'id': row.id,
                'realname': row.nama,
                'username': row.username,
                'hashedpassword': row.password,
                'module': row.module,
                'expires' : expires
              };
            });
            _data.create('sessions', sessionId, sessionObject, function(err){
              if(!err){
                callback(200, sessionObject);
              } else {
                callback(500, {'Error' : 'Could not create the new session'});
              }
            });
          }
        });
      } else {
        callback(405);
      }
    });
  } else {
    callback(405);
  }
};

module.exports = handlers;
