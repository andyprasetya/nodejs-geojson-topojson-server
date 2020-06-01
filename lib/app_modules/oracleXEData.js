process.on('message', function(data){
  /* TODO */
  process.send(json);
  process.exit();
});
