var fs = require('fs');
var path = require('path');
var sqlite = require('spatialite');

var config = require('./config');
var helpers = require('./helpers');

var lib = {};
lib.baseDir = path.join(__dirname, '/public/data/');
lib.dbFile = lib.baseDir +'db/'+ config.sqliteDBFile;

lib.dbObject = new sqlite.Database(lib.dbFile, sqlite.OPEN_READWRITE, (err) => {
  if(err) throw err;
});

lib.create = function(dir, file, data, callback){
  fs.open(lib.baseDir + dir +'/'+ file +'.json', 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      var stringData = JSON.stringify(data, null, 2);
      fs.writeFile(fileDescriptor, stringData, function(err){
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

lib.read = function(dir, file, callback){
  fs.readFile(lib.baseDir + dir +'/'+ file +'.json', 'utf8', function(err, data){
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

lib.update = function(dir, file, data, callback){
  fs.open(lib.baseDir + dir +'/'+ file +'.json', 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      var stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor, function(err){
        if(!err){
          fs.writeFile(fileDescriptor, stringData, function(err){
            if(!err){
              fs.close(fileDescriptor, function(err){
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

lib.delete = function(dir, file, callback){
  fs.unlink(lib.baseDir + dir +'/'+ file +'.json', function(err){
    callback(err);
  });
};

lib.list = function(dir, callback){
  fs.readdir(lib.baseDir + dir +'/', function(err, data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace('.json',''));
      });
      callback(false, trimmedFileNames);
    } else {
      callback(err, data);
    }
  });
};

lib.wrangleData = function(codex, data){
  var objData = data;
  var objCommonData = {"codex": codex, "totalpopulation": "0", "seat_quota": "0", "flag_basemap": "0", "osm_standard": "0", "osm_dark": "0", "google_satellite": "0", "google_hybrid": "0", "google_streets": "0", "google_terrain": "0", "data_notes": "-"};
  var objFeaturesData = {"population": "0", "area_quota": "0", "modulo_quota": "0", "seats": "0", "district": "-", "feature_notes": "-"};
  Object.assign(objData, objCommonData);
  var featuresArray = objData.features;
  featuresArray.forEach(function(feature){
    Object.assign(feature.properties, objFeaturesData);
  });
  return objData;
};

lib.updateCommonData = function(fileName, dataKey, dataValue){
  return;
};

lib.updateFeatureData = function(fileName, dataKey, dataId, dataValue){
  return;
};

module.exports = lib;
