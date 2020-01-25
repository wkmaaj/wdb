var express = require("express");
let app = express();

// ROUTES
app.get("/", function(req, res) {
	res.send("Hi there!");
});

app.get("/bye", function(req, res) {
	res.send("Goodbye!");
});

app.get("/dog", function(req, res) {
	console.log(req);
	res.send("MEOW!!!");
});

app.get("/products/:productName", function(req, res) {
	console.log(req.params);
	res.send("Welcome to the " + req.params.productName.toUpperCase() + " (i.e. a variable) context path");
});

app.get("/products/:productName/imgs/:imageRef", function(req, res) {
	res.send("Welcome to the " + req.params.imageRef + " (i.e. a static and variable) context path for " + req.params.productName + " product");
});

app.get("*", function(req, res) {
	res.redirect(302, "/dog");
});

// SERVER LISTENER
app.listen(3000, function() {
	console.log("Serving application on port 3000");
});
