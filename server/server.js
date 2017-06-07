var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/websocket.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    
    socket.on('valor', function(v){
        console.log('recebido: ' + v);
        socket.emit('pagina', 'olá do servidor');
    });
    
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
