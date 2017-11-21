
var express = require('express');
var downloadFile = require('./download');

var app = express();

app.use('/api/download', downloadFile.default);

var server = app.listen(12345, function() {
	console.log('Listening on port %d', server.address().port);
});