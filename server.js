// server.js
// where your node app starts

// init project
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var email = require('./mail.js');

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

let socket;
io.on('connection', function(_socket_){
  socket = _socket_;
  socket.on('chat message', onNewMessage);
});

      
//
//---HTTP API---
//

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});


//
//---HANDLE NEW MESSAGES
//

function onNewMessage(msg) {
  socket.broadcast.emit('chat message', msg);
  console.log(email.send());
}