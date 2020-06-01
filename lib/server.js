var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var helpers = require('./helpers');
var handlers = require('./handlers');
var geopgsql = require('./geopgsql');
var geosqlite = require('./geosqlite');
var geomysql = require('./geomysql');
var path = require('path');
var util = require('util');
var debug = util.debuglog('server');

var server = {};

server.httpServer = http.createServer(function(req,res){
  server.unifiedServer(req,res);
});

server.httpsServerOptions = {
  'key': fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
  'cert': fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
};
server.httpsServer = https.createServer(server.httpsServerOptions,function(req,res){
  server.unifiedServer(req,res);
});

server.unifiedServer = function(req,res){
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  var queryStringObject = parsedUrl.query;
  var method = req.method.toLowerCase();
  var headers = req.headers;
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data);
  });
  req.on('end', function() {
    buffer += decoder.end();
    var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;
    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer)
    };
    chosenHandler(data,function(statusCode,payload){
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      payload = typeof(payload) == 'object'? payload : {};
      var payloadString = JSON.stringify(payload);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      if(statusCode == 200){
        debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      } else {
        debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      }
    });
  });
};

server.router = {
  'geojson-server/alive' : handlers.alive,
  'geojson-server/version' : handlers.version,
  'geojson-server/getInitToken' : handlers.getInitToken,
  'geojson-server/getAllSamplePoints' : geopgsql.getAllPoints,
  'geojson-server/getAllSampleLines' : geopgsql.getAllLines,
  'geojson-server/getAllSamplePolygons' : geopgsql.getAllPolygons,
  'geojson-server/getAllSQLitePoints' : geosqlite.getAllSQLitePoints,
  'geojson-server/getAllSQLiteLines' : geosqlite.getAllSQLiteLines,
  'geojson-server/getAllSQLitePolygons' : geosqlite.getAllSQLitePolygons,
  'geojson-server/getAllMySQLPoints' : geomysql.getAllMySQLPoints,
  'geojson-server/getAllMySQLLines' : geomysql.getAllMySQLLines,
  'geojson-server/getAllMySQLPolygon' : geomysql.getAllMySQLPolygon,
  'geojson-server/log' : handlers.log
};

server.init = function(){
  server.httpServer.listen(config.httpPort,function(){
    console.log('\x1b[36m%s\x1b[0m','The GeoJSON server [HTTP] is running on port '+config.httpPort);
  });
  server.httpsServer.listen(config.httpsPort,function(){
    console.log('\x1b[35m%s\x1b[0m','The GeoJSON server [HTTPS] is running on port '+config.httpsPort);
  });
};

module.exports = server;
