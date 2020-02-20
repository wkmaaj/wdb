const express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

router.get("/:var((index|about)(.html|.ejs)?)", (req, res) => {
	res.render("about");
});

router.get("/:var((home|landing)(.html|.ejs)?)?", (req, res) => {
	res.render("landing");
});

router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err) {
			console.error("Unsuccessful registration operation\n" + err);
			req.flash("error", err.message);
			res.redirect("/register");
		}

		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome " + user.username + " and thank you for signing up!");
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
	req.flash("success", "Successfully logged out!");
	res.redirect("/landing");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

module.exports = router;