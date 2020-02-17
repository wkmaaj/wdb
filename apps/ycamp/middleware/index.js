const mw = {},
	Campground = require("../models/campground"),
	Comment = require("../models/comment");

mw.isAuthorized = (req, res, next) => {
	if(req.isAuthenticated()) {
		if(req.params.comment_id) {
			Comment.findById(req.params.comment_id, (err, comment) => handleQuery(req.params.comment_id, req, err, comment, "Comment", next));
		} else if(req.params.id) {
			Campground.findById(req.params.id, (err, campground) => handleQuery(req.params.id, req, res, err, campground, "Campground", next));
		}
		else {
			console.error("Malformed request, expected parameter missing, see below for more info:\n" + req);
			req.flash("error", "Something went wrong, try again... ~\\|/~");
			res.redirect("/campgrounds");
		}
	}
	else {
		console.error("Unauthenticated request, request must originate from an authenticated user");
		req.flash("error", "Restricted for user access only, please login or signup to continue...");
		res.redirect("/login");
	}
};

mw.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Restricted for user access only, please login or signup to continue...");
	res.redirect("/login");
};

function handleQuery(id, req, res, err, dbres, dbtype, next) {
	if(err) {
		console.error("Unsuccessful query operation using [" + id + "], see below for more info:\n" + err);
		req.flash("error", dbtype + " not found, please validate query parameter(s) and then try again...")
		res.redirect("back");
	}
	else {
		console.log("Successful query operation using [" + id + "], see below for more info:\n" + dbres);
		if(dbres.author.username === "Admin" || ((dbres.author.id) && dbres.author.id.equals(req.user._id))) {
			next();
		}
		else {
			console.error("Unauthorized request, user is not authorized to access this page/link/action");
			req.flash("error", "Access denied, you are not authorized to access this page/link/action!");
			res.redirect("/campgrounds");
		}
	}
};

module.exports = mw;