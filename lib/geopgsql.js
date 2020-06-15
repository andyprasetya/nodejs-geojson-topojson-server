var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');
var _dbgeo = require('./dbgeo');

var handlers = {};

/* End-Point: /getAllPgSQLPoints */
handlers.getAllPgSQLPoints = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var pgpool = _data.pgpool;
    pgpool.query(`SELECT * FROM data_points`, [], (queryError, queryResult) => {
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

/* End-Point: /getAllPgSQLLines */
handlers.getAllPgSQLLines = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var pgpool = _data.pgpool;
    pgpool.query(`SELECT * FROM data_lines`, [], (queryError, queryResult) => {
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

/* End-Point: /getAllPgSQLPolygons */
handlers.getAllPgSQLPolygons = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    var pgpool = _data.pgpool;
    pgpool.query(`SELECT * FROM data_polygons`, [], (queryError, queryResult) => {
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
