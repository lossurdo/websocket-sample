var io = require('socket.io')(3000);
var keys = [];

io.on('connection', function (socket) {

  socket.emit('ping', {msg: 'Socket established!'});

  socket.on('fromMobile', function (o) {
    console.log('Received from mobile: ', o);

    if(keys.indexOf(parseInt(o.k)) != -1) {
      socket.broadcast.emit('sync', {ok:'true'});
    } else {
      socket.broadcast.emit('sync', {ok:'false'});
    }
  });

  socket.on('fromClient', function (o) {
    console.log('Received from client: ', o);
    keys.push(o.k);
    console.log('All keys :' + keys);
  });

});