// server.js
// where your node app starts

// init project
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(process.env.PORT, function(){
  console.log('listening on *:'+process.env.PORT);
});


//
//---CORS---
//

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//
//---SOCKET SETUP---
//
require('./socket.js').init(io);

      
//
//---HTTP API---
//

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});