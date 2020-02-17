const express = require("express"),
	router = express.Router({mergeParams: true}),
	Campground = require("../models/campground"),
	Comment = require("../models/comment"),
	mw = require("../middleware/index");

router.get("/new", mw.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
		}
		else {
			res.render("comments/new", {campground: campground});
		}
	})
});

router.post("/", mw.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
			res.redirect("/campgrounds");
		}
		else {
			req.body.comment.author = {
				id: req.user._id,
				username: req.user.username
			};
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

router.get("/:comment_id/edit", mw.isAuthorized, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.error("Unsuccessful query operation using [" + req.params.id + "], see below for more info:\n" + err);
			res.redirect("back");
		}
		else {
			Comment.findById(req.params.comment_id, (err, comment) => {
				res.render("comments/edit", {campground: campground, comment: comment});
			});
		}
	});
});

router.put("/:comment_id", mw.isAuthorized, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
		if(err) {
			console.error("Unsuccessful update operation\n" + err);
			res.redirect("back");
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:comment_id", mw.isAuthorized, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if(err) {
			console.error("Unsuccessful delete operation\n" + err);
			res.redirect("back");
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;