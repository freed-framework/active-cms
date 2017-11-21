'use strict';

var express = require('express');
var downloadFile = require('./download');

var app = express();

app.use('/ssr/download', downloadFile.default);

var server = app.listen(12345, function () {
	console.log('Listening on port %d', server.address().port);
});
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(app, 'app', 'src/index.js');

	__REACT_HOT_LOADER__.register(server, 'server', 'src/index.js');
}();

;