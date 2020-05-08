var config = require('../config');

process.on('message', function(data){
  var json = {"version":config.version, "codename":config.codeName};
  process.send(json);
  process.exit();
});
