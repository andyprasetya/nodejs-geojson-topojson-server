var environments = {};

environments.staging = {
  'envName' : 'staging',
  'sqliteDBFile': 'db.sqlite',
  'fileUploadTempDir' : '/public/data/tmp/',
  'fileUploadDir' : '/public/data/shapefiles/',
  'fileGeoJSONDir' : '/public/data/files/',
  'extractFileTargetDir' : '/public/data/shapefiles/',
  'uploadedFileDir' : '/public/data/tmp/',
  'baseGeoJSONDir' : '/public/data/files/',
  'hashingPairs' : '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  'hashingSecret' : 'b144700387101111f02422bf234266affcd786eb15289d695b412c0587243947'
};

environments.production = {
  'envName' : 'production',
  'sqliteDBFile': 'db.sqlite',
  'fileUploadTempDir' : '/public/data/tmp/',
  'fileUploadDir' : '/public/data/shapefiles/',
  'fileGeoJSONDir' : '/public/data/files/',
  'extractFileTargetDir' : '/public/data/shapefiles/',
  'uploadedFileDir' : '/public/data/tmp/',
  'baseGeoJSONDir' : '/public/data/files/',
  'hashingPairs' : '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  'hashingSecret' : 'b144700387101111f02422bf234266affcd786eb15289d695b412c0587243947'
};
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;
module.exports = environmentToExport;
