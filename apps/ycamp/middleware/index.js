const mw = {},
	Campground = require("../models/campground"),
	Comment = require("../models/comment");

mw.isAuthorized = (req, res, next) => {
	if(req.isAuthenticated()) {
		if(req.params.comment_id) {
			Comment.findById(req.params.comment_id, (err, comment) => handleQuery(req.params.comment_id, req.user._id, err, comment, next));
		} else if(req.params.id) {
			Campground.findById(req.params.id, (err, campground) => handleQuery(req.params.id, req.user._id, err, campground, next));
		}
		else {
			console.error("Malformed request, expected parameter missing, see below for more info:\n" + req);
		}
	}
	else {
		console.error("Unauthenticated request, request must originate from an authenticated user");
		res.redirect("/login");
	}
};

mw.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

function handleQuery(id, userid, err, dbres, next) {
	if(err) {
		console.error("Unsuccessful query operation using [" + id + "], see below for more info:\n" + err);
		res.redirect("back");
	}
	else {
		console.log("Successful query operation using [" + id + "], see below for more info:\n" + dbres);
		if(dbres.author.username === "Admin" || ((dbres.author.id) && dbres.author.id.equals(userid))) {
			next();
		}
		else {
			console.error("Unauthorized request, user is not authorized to access this page/link/action");
			res.redirect("back");
		}
	}
};

module.exports = mw;