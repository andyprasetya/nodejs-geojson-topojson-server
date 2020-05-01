var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');
var config = require('./config');

var sqlite3 = require('sqlite3').verbose();
var { Pool, Client } = require('pg');
var mysql = require('mysql');

var lib = {};

lib.baseDir = path.join(__dirname,'/../data/');

lib.dbFile = lib.baseDir + config.sqliteDBFile;

lib.sqliteconnect = new sqlite3.Database(lib.dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if(err) throw err;
});

lib.pgpool = new Pool();

lib.pgclient = new Client();

lib.mysqlPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlDBHost,
  port: config.mysqlDBPort,
  user: config.mysqlDBUser,
  password: config.mysqlDBPass,
  database: config.mysqlDBName
});

lib.create = function(dir,file,data,callback){
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      var stringData = JSON.stringify(data);
      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });
};

lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err,data){
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,data);
    }
  });
};

lib.update = function(dir,file,data,callback){
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      var stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor,function(err){
        if(!err){
          fs.writeFile(fileDescriptor, stringData,function(err){
            if(!err){
              fs.close(fileDescriptor,function(err){
                if(!err){
                  callback(false);
                } else {
                  callback('Error closing existing file');
                }
              });
            } else {
              callback('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open file for updating, it may not exist yet');
    }
  });
};

lib.delete = function(dir,file,callback){
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
    callback(err);
  });
};

lib.list = function(dir,callback){
  fs.readdir(lib.baseDir+dir+'/', function(err,data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace('.json',''));
      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};

module.exports = lib;
