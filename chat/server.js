var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static('public'));

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

var buildMessage = function(user, msg) {
    return '<b>' + user + '</b> says: ' + msg + '<br />';
}

io.on('connection', function(socket) {
    socket.emit('to_client', buildMessage('root', 'Welcome aboard!'));

    socket.on('to_server', function(data) {
        json = JSON.parse(data);
        socket.emit('to_client', buildMessage(json.user, json.message));
        socket.broadcast.emit('to_client', buildMessage(json.user, json.message));
    });
});

console.log('I\'m ready to go... 9000 port!');
server.listen(9000); 