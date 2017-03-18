var email = require('./mail.js');

let socket;

exports.init = function init(io){
  io.on('connection', function(_socket_){
    socket = _socket_;
    socket.on('chat message', onNewMessage);
  });
}

//
//---HANDLE NEW MESSAGES
//

function onNewMessage(msg) {
  socket.broadcast.emit('chat message', msg);
  email.send(msg);
}