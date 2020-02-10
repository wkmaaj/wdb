const express = require('express');
const request = require('request');

const app = express();
app.use(express.static("static"));
app.use(express.static("../../resources/css/lib"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("search");
});

app.get("/results", function(req, res) {
	let url = "http://omdbapi.com?s=" + req.query.search + "&apikey=thewdb";
	request(url, function(error, response, body) {
		if(error || (response.statusCode !== 200)) {
			errorHandler(res, req.query.search, (error ? error : (`Received invalid ${response.statusCode} response`)));
		}
		else {
			let results = JSON.parse(body);
			if(results["Error"]) {
				errorHandler(res, req.query.search, `Search for '${req.query.search}' returned '${results["Error"]}'`);
			}
			else {
				console.log(`totalResults: ${results.totalResults}`);
				res.render("results", {search: req.query.search, results: results});
			}
		}
	});
});

function errorHandler(res, search, msg) {
	console.error(msg);
	res.render("error", {search: search});
}

app.listen(3000, function() {
	console.log("Server up, running, listening, and of course is configured to port 3000");
});