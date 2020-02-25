const express = require("express"),
	router = express.Router(),
	Campground = require("../models/campground"),
	mw = require("../middleware");

router.get("/", (req, res) => {
	Campground.find({}, function(err, campgrounds) {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
		}
		else {
			if(process.env.DEBUG_LOG) {
				console.log("Successful query operation, " + campgrounds.length + " campgrounds returned");
			}
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

router.post("/", mw.isLoggedIn, (req, res) => {
	Campground.create({
		name: req.body.name,
		image: req.body.image,
		desc: req.body.desc,
		price: {
			currency: req.body.currency,
			value: req.body.value
		},
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
	res.redirect("/campgrounds");
});

router.get("/new", mw.isLoggedIn, (req, res) => {
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

router.get("/:id/edit", mw.isAuthorized, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		res.render("campgrounds/edit", {campground: campground});
	});
});

router.put("/:id", mw.isAuthorized, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
		if(err) {
			console.error("Unsuccessful update operation(s)\n" + err);
			res.redirect("back");
		}
		else {
			req.flash("info", "Successfully updated " + campground.name + " page");
			res.redirect("/campgrounds/" + campground._id);
		}
	});
});

router.delete("/:id", mw.isAuthorized, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if(err) {
			console.error("Unsuccessful delete operation(s)\n" + err);
			res.redirect("back");
		}
		res.redirect("/campgrounds");
	});
});

module.exports = router;