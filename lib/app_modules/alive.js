process.on('message', function(data){
  var objDate = new Date();
  var json = {"status":"alive", "datetime":objDate.toISOString()};
  process.send(json);
  process.exit();
});
