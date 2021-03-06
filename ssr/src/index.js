
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var push = require('./push');
var io = require('socket.io')(5555, {
  path: '/push',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', (socket) => {
  socket.emit('connection', '链接成功');
});

var app = express();

app.use(bodyParser.json());
app.use(cookieParser('node-auth'));

app.use('*', function (req, res, next) {
	req.socket = io;
	next();
})

app.use('/ssr/push', push.default);

var server = app.listen(12345, function() {
	console.log('Listening on port %d', server.address().port);
});