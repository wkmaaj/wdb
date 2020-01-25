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
        res.send("MEOW!!!");
});

app.listen(3000, function() {
        console.log("Serving application on port 3000");
});
