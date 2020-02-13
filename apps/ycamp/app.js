const express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seeds = require("./seeds");

mongoose.connect("mongodb://localhost:27017/ycamp", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
seeds();

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));
app.use(express.static("../../resources/css/lib"));
app.use(express.static("../../resources/js/lib"));
app.set("view engine", "ejs");

app.get("/:var((home|index)(.html|.ejs)?)?", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	Campground.find({}, function(err, campgrounds) {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
		}
		else {
			console.log("Successful query operation, " + campgrounds.length + " campgrounds returned");
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

app.post("/campgrounds", (req, res) => {
	Campground.create({
		name: req.body.name,
		image: req.body.image,
		desc: req.body.desc
	}, function(err, campground) {
		if(err) {
			console.error("Unsuccessful save operation\n" + err);
		}
		else {
			console.log("Successful save operation:\n" + campground);
		}
	});
	res.redirect("campgrounds/index");
});

app.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/new");
});

app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.url.split("/campgrounds/")[1]).populate("comments").exec((err, campground) => {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
		}
		else {
			console.log("Successful query operation, " + campground.name + " returned");
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

app.get("/campgrounds/:id/comments/new", (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
		}
		else {
			res.render("comments/new", {campground: campground});
		}
	})
});

app.post("/campgrounds/:id/comments", (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
			res.redirect("/campgrounds");
		}
		else {
			Comment.create(req.body.comment, (err, comment) => {
				if(err) {
					console.error("Unsuccessful save operation\n" + err);
				}
				else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	})
});

app.listen(3000, function() {
	console.log("YelpCamp up and running, currently listening on port 3000");
});