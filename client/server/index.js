var express = require("express");
var path = require("path");
var page = require("./page.generated.js");

var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "public")));

var stats = require("./stats.generated.json");

app.get("/", function(req, res) {
	res.end(page(req, stats.assetsByChunkName.main));
});

app.post("/getPage", function(req, res) {
	res.end(page(req, stats.assetsByChunkName.main, req.body.data));
});

var server = app.listen(4000, function() {
	console.log('Listening on port %d', server.address().port);
});