
var React = require("react");
// import React from 'react';

var View = require('../viewer/App.jsx')

// var Ap = require("../app/ap.jsx");
// import Ap from '../app/ap.jsx'

// var styleCollector = require("./style-collector");

var ReactDOMServer = require('react-dom/server');
// import ReactDOMServer from 'react-dom/server';

module.exports = function(req, scriptFilename) {
	var html = ReactDOMServer.renderToString(<View.default />);
	return ReactDOMServer.renderToString(
		<html>
			<head>
				<link id="server-side-style" href={"assets/" + scriptFilename[1]} rel="stylesheet" type="text/css" />
			</head>
			<body>
				<div id="content" dangerouslySetInnerHTML={{__html: html}} />
				<script src={"assets/" + scriptFilename[0]}></script>
			</body>
		</html>
	);
}