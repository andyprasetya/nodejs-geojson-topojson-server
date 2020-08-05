var _data = require('./data');
var _dbgeo = require('./dbgeo');

var handlers = {};

/* End-Point: /getAdminKota */
handlers.getAdminKota = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var pgpool = _data.pgpool;
    pgpool.query(`SELECT * FROM admin_kota`, [], (queryError, queryResult) => {
      if(queryError){
        callback(405);
      }
      var _queryData = queryResult.rows;
      _dbgeo.parse(_queryData, {
        outputFormat: 'geojson',
        precision: 7
      }, function(dbgeoError, _dbgeoData) {
        if (dbgeoError) {
          callback(405);
        }
        callback(200, _dbgeoData);
      });
    });
  } else {
    callback(405);
  }
};

/* End-Point: /getAdminKecamatan */
handlers.getAdminKecamatan = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var pgpool = _data.pgpool;
    pgpool.query(`SELECT * FROM admin_kecamatan`, [], (queryError, queryResult) => {
      if(queryError){
        callback(405);
      }
      var _queryData = queryResult.rows;
      _dbgeo.parse(_queryData, {
        outputFormat: 'geojson',
        precision: 7
      }, function(dbgeoError, _dbgeoData) {
        if (dbgeoError) {
          callback(405);
        }
        callback(200, _dbgeoData);
      });
    });
  } else {
    callback(405);
  }
};

/* End-Point: /getAdminKelurahan */
handlers.getAdminKelurahan = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var pgpool = _data.pgpool;
    pgpool.query(`SELECT * FROM admin_kelurahan`, [], (queryError, queryResult) => {
      if(queryError){
        callback(405);
      }
      var _queryData = queryResult.rows;
      _dbgeo.parse(_queryData, {
        outputFormat: 'geojson',
        precision: 7
      }, function(dbgeoError, _dbgeoData) {
        if (dbgeoError) {
          callback(405);
        }
        callback(200, _dbgeoData);
      });
    });
  } else {
    callback(405);
  }
};

/* End-Point: /getTPSTPA */
handlers.getTPSTPA = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var pgpool = _data.pgpool;
    pgpool.query(`SELECT * FROM data_points WHERE classification = 'TPS' OR classification = 'TPST' OR classification = 'TPA'`, [], (queryError, queryResult) => {
      if(queryError){
        callback(405);
      }
      var _queryData = queryResult.rows;
      _dbgeo.parse(_queryData, {
        outputFormat: 'geojson',
        precision: 7
      }, function(dbgeoError, _dbgeoData) {
        if (dbgeoError) {
          callback(405);
        }
        callback(200, _dbgeoData);
      });
    });
  } else {
    callback(405);
  }
};

module.exports = handlers;
