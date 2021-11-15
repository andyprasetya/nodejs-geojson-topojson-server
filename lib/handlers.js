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

/* sample */
handlers.billInquiry = function(data, callback){
  var acceptableMethods = ['post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    if(data.headers.token && data.payload.idBilling){
      var _tStr = helpers.parseBase64ToString(data.headers.token);
      _data.read('tokens', _tStr, function(err, tokenData){
        let _requestTimestamp = new Date().valueOf();
        if(!err && tokenData.token == _tStr && tokenData.expires > _requestTimestamp){
          handlers._billInquiry[data.method](data,callback);
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
handlers._billInquiry = {};
handlers._billInquiry.post = function(data,callback){
  var billidx = data.payload.idBilling;
  var billthn = billidx.substring(0,2);
  var billbln = billidx.substring(2,4);
  var dataidx = parseInt(billidx.substring(4,11));
  var billctx = billidx.substring(11);
  var cpoolH2H = _data.mysqlH2HPool;
  if(billctx == '04'){
    cpoolH2H.query("SELECT idx, dataidx, idbilling, npwpd, th_pajak, context, DATE_FORMAT(dt_payment, '%Y-%m-%d %H:%i:%s') AS dt_payment, DATE_FORMAT(d_payment, '%Y-%m-%d') AS d_payment, nama, alamat, taxobjectidx, taxlocation, tagihan, denda, (tagihan + denda) AS totaltagihan, trx_amount, flag_paid FROM h2h_data WHERE idbilling = ? AND dataidx = ?", [billidx, dataidx], (queryerror, queryresult, fields) => {
      if(queryerror){
        callback(200, {"status":"87","message":"BILL NUMBER NOT FOUND"});
      }
      if(queryresult.length==0){
        callback(200, {"status":"87","message":"BILL NUMBER NOT FOUND"});
      } else {
        var _dataFound = queryresult[0];
        var _dataidx = _dataFound.dataidx;
        var responseObject;
        if(_dataFound.dt_payment == '1970-01-01 00:00:00' && _dataFound.d_payment == '1970-01-01' && parseInt(_dataFound.trx_amount) == 0 && parseInt(_dataFound.flag_paid) == 0){
          responseObject = {
            'idBilling': ''+ _dataFound.idbilling +'',
            'NPWPD': ''+ _dataFound.npwpd +'',
            'masaPajak': ''+ _dataFound.th_pajak +'',
            'jenisPajak': ''+ _dataFound.context +'',
            'namaWP': ''+ _dataFound.nama +'',
            'alamatWP': ''+ _dataFound.alamat +'',
            'namaOP': ''+ _dataFound.taxobjectidx +'',
            'alamatOP': ''+ _dataFound.taxlocation +'',
            'tagihan': ''+ _dataFound.tagihan +'',
            'denda': ''+ _dataFound.denda +'',
            'jmlTagihan': ''+ parseInt(_dataFound.totaltagihan) +''
          };
          callback(200, {"status":"00","message":"SUCCESS","data":responseObject});
        } else if(_dataFound.dt_payment != '1970-01-01 00:00:00' && _dataFound.d_payment != '1970-01-01' && parseInt(_dataFound.trx_amount) > 0 && parseInt(_dataFound.flag_paid) == 1){
          responseObject = {
            'idBilling': ''+ _dataFound.idbilling +'',
            'NPWPD': ''+ _dataFound.npwpd +'',
            'masaPajak': ''+ _dataFound.th_pajak +'',
            'jenisPajak': ''+ _dataFound.context +'',
            'namaWP': ''+ _dataFound.nama +'',
            'alamatWP': ''+ _dataFound.alamat +'',
            'namaOP': ''+ _dataFound.taxobjectidx +'',
            'alamatOP': ''+ _dataFound.taxlocation +'',
            'tagihan': ''+ _dataFound.tagihan +'',
            'denda': ''+ _dataFound.denda +'',
            'jmlTagihan': ''+ parseInt(_dataFound.totaltagihan) +''
          };
          callback(200, {"status":"88","message":"BILL ALREADY PAID","data":responseObject});
        } else {
          callback(200, {"status":"87","message":"BILL NUMBER NOT FOUND"});
        }
      }
    });
  } else {
    callback(200, {"status":"87","message":"BILL NUMBER NOT FOUND"});
  }
};

module.exports = handlers;
