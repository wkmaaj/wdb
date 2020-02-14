const express = require("express"),
	router = express.Router(),
	Campground = require("../models/campground");

router.get("/", (req, res) => {
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

router.post("/", isLoggedIn, (req, res) => {
	Campground.create({
		name: req.body.name,
		image: req.body.image,
		desc: req.body.desc,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	}, function(err, campground) {
		if(err) {
			console.error("Unsuccessful save operation\n" + err);
		}
		else {
			console.log("Successful save operation:\n" + campground);
		}
	});
	res.redirect("/");
});

router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
		}
		else {
			console.log("Successful query operation, " + campground.name + " returned");
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

router.get("/:id/edit", (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
			res.redirect("/campgrounds");
		}
		else {
			console.log("Successful query operation, " + campground.name + " returned");
			res.render("campgrounds/edit", {campground: campground});
		}
	});
});

router.put("/:id", (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
		if(err) {
			console.error("Unsuccessful query and/or update operation(s)\n" + err);
			res.redirect("/campgrounds");
		}
		else {
			res.redirect("/campgrounds/" + campground._id);
		}
	});
});

router.delete("/:id", (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if(err) {
			console.error("Unsuccessful query and/or delete operation(s)\n" + err);
		}
		res.redirect("/campgrounds");
	});
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

module.exports = router;