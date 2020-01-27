var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	logRequestInfo(req);
	res.render("home");
});

app.get("/love/:thing", function(req, res) {
	// pass a JSON object to template file containing values for the template's variables
	logRequestInfo(req);
	res.render("love", {thingVar: req.params.thing.toLowerCase()});
});

app.get("/posts", function(req, res) {
	var posts = [
		{title: "First", author: "Waleed"},
		{title: "Second", author: "Khaled"},
		{title: "Final", author: "Mohammad"},
	];

	res.render("posts", {postsVar: posts});
})

app.listen(3000, function() {
	console.log("Server is up, running, and listening on port 3000");
});

function logRequestInfo(req) {
	console.log(req.headers);
}