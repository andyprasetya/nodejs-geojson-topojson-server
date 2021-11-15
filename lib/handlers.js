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

/* TODO: create fork/child process for this */
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

handlers.createToken = function(data, callback){
  var acceptableMethods = ['post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    if(data.headers.token && data.payload.userid){
      var _tStr = helpers.parseBase64ToString(data.headers.token);
      var _arrToken = _tStr.split('.');
      _data.read('static_tokens', _arrToken[2], function(err, tokenData){
        let _requestTimestamp = parseInt(_arrToken[3]);
        if(!err && data.payload.userid == _arrToken[0] && tokenData.userid == _arrToken[0] && tokenData.password == _arrToken[1] && tokenData.token == _arrToken[2] && tokenData.expires > _requestTimestamp){
          handlers._createToken[data.method](data,callback);
        } else {
          callback(405);
        }
      });
    } else {
      callback(405);
    }
  } else {
    callback(405);
  }
}
handlers._createToken = {};
handlers._createToken.post = function(data,callback){
  let _expString = ''+ helpers.getCurrentDate() +' 23:59:58';
  let expires = new Date(_expString).valueOf();
  let randstr = ''+ data.payload.userid +''+ helpers.createRandomString(32) +'';
  let hashedstr = helpers.hash(randstr);
  let tokenObject = {'token': hashedstr, 'expires': expires};
  _data.create('tokens', hashedstr, tokenObject, function(err){
    if(!err){
      callback(200, tokenObject);
    } else {
      callback(405);
    }
  });
};

/* -- Endpoint: /dataByDate -- */
handlers.dataByDate = function(data, callback){
  var acceptableMethods = ['post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    if(data.headers.token && data.payload.idBilling){
      var _tStr = helpers.parseBase64ToString(data.headers.token);
      _data.read('tokens', _tStr, function(err, tokenData){
        let _requestTimestamp = new Date().valueOf();
        if(!err && tokenData.token == _tStr && tokenData.expires > _requestTimestamp){
          handlers._dataByDate[data.method](data,callback);
        } else {
          callback(405);
        }
      });
    } else {
      callback(405);
    }
  } else {
    callback(405);
  }
}
handlers._dataByDate = {};
handlers._dataByDate.post = function(data,callback){
  var cpoolH2H = _data.mysqlH2HPool;
  cpoolH2H.query(`SELECT DATE_FORMAT(d_payment, '%Y-%m-%d') AS tanggal, SUM(trx_amount) AS realisasi FROM h2h_data WHERE d_payment = ? GROUP BY d_payment`, [data.payload.qdate], (queryError, queryResult, fields) => {
    if(queryError){
      callback(200, {"code": 203, "message": "QUERY_ERROR", "data": {"error_message": queryError.stack}});
    }
    if(queryResult.length == 0){
      callback(200, {"code": 201, "message":"DATA_NOT_FOUND", "data": {}});
    } else {
      var dataFound = queryResult;
      callback(200, {"code": 200, "message":"DATA_FOUND", "data": dataFound});
    }
  });
};

/* -- Endpoint: /rangedDataByDate -- */
handlers.rangedDataByDate = function(data, callback){
  var acceptableMethods = ['post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    if(data.headers.token && data.payload.idBilling){
      var _tStr = helpers.parseBase64ToString(data.headers.token);
      _data.read('tokens', _tStr, function(err, tokenData){
        let _requestTimestamp = new Date().valueOf();
        if(!err && tokenData.token == _tStr && tokenData.expires > _requestTimestamp){
          handlers._rangedDataByDate[data.method](data,callback);
        } else {
          callback(405);
        }
      });
    } else {
      callback(405);
    }
  } else {
    callback(405);
  }
}
handlers._rangedDataByDate = {};
handlers._rangedDataByDate.post = function(data,callback){
  var cpoolH2H = _data.mysqlH2HPool;
  cpoolH2H.query(`SELECT DATE_FORMAT(d_payment, '%Y-%m-%d') AS tanggal, SUM(trx_amount) AS realisasi FROM h2h_data WHERE d_payment BETWEEN ? AND ? GROUP BY d_payment`, [data.payload.qdatestart, data.payload.qdateend], (queryError, queryResult, fields) => {
    if(queryError){
      callback(200, {"code": 203, "message": "QUERY_ERROR", "data": {"error_message": queryError.stack}});
    }
    if(queryResult.length == 0){
      callback(200, {"code": 201, "message":"DATA_NOT_FOUND", "data": {}});
    } else {
      var dataFound = queryResult;
      callback(200, {"code": 200, "message":"DATA_FOUND", "data": dataFound});
    }
  });
};

handlers.log = function(data,callback){
  var acceptableMethods = ['get','post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    callback(200, {"code": 200, "message": "LOGGED", "data": {}});
  } else {
    callback(405);
  }
};

module.exports = handlers;