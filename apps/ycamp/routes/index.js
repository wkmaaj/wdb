const express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

router.get("/:var((home|index)(.html|.ejs)?)?", (req, res) => {
	res.render("landing");
});

router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err) {
			console.error("Unsuccessful registration operation\n" + err);
			return res.render("register");
		}

		passport.authenticate("local")(req, res, () => {
			res.redirect("/campgrounds");
		});
	});
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res) => {});

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged You Out Successfully");
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

module.exports = router;