const express = require('express');
const request = require('request');

const app = express();
app.use(express.static("static"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("search");
});

app.get("/results", function(req, res) {
	let url = "http://omdbapi.com?s=" + req.query.search + "&apikey=thewdb";
	request(url, function(error, response, body) {
		if(error) {
			console.error(error);
		}
		else {
			console.log("statusCode: ", response && response.statusCode);
			if(response.statusCode === 200) {
				let results = JSON.parse(body);
				if(results["Error"]) {
					console.error(results["Error"]);
					res.render("error", {search: req.query.search});
				}
				else {
					console.log(`totalResults: ${results.totalResults}`);
					res.render("results", {search: req.query.search, results: results});
				}
			}
		}
	});
});

app.listen(3000, function() {
	console.log("Server up, running, listening, and of course is configured to port 3000");
});