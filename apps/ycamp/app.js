const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ycamp", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	desc: String
});
const Campground = mongoose.model("Campground", campgroundSchema);

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));
app.use(express.static("../../resources/css/lib"));
app.use(express.static("../../resources/js/lib"));
app.set("view engine", "ejs");

app.get("/:var((home|index)(.html|.ejs)?)?", (req, res) => {
	res.render("index");
});

app.get("/campgrounds", (req, res) => {
	Campground.find({}, function(err, campgrounds) {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
		}
		else {
			console.log("Successful query operation, " + campgrounds.length + " campgrounds returned");
			res.render("campgrounds", {campgrounds: campgrounds});
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
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.url.split("/campgrounds/")[1], function(err, campground) {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
		}
		else {
			console.log("Successful query operation, " + campground.name + " returned");
			res.render("campground", {campground: campground});
		}
	});
});

app.listen(3000, function() {
	console.log("YelpCamp up and running, currently listening on port 3000");
});