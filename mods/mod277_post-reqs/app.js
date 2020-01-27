var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var friends = ["Aykut", "Hik", "Sib", "Nasser", "AR", "Mo"];

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/friends", function(req, res) {
	res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req, res) {
	friends.push(req.body.friend);
	console.log("Added " + req.body.friend + " to friends list");
	res.redirect("friends");
});

app.listen(3000, function() {
	console.log("Server up and running on port 3000");
});