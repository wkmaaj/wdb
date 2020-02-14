const express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seeds = require("./seeds"),
	commentsRoutes = require("./routes/comments"),
	campgroundsRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/ycamp", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
// seeds();

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));
app.use(express.static("../../resources/css/lib"));
app.use(express.static("../../resources/js/lib"));
app.use(require("express-session")({
	secret: "google whatever you want",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000, function() {
	console.log("YelpCamp up and running, currently listening on port 3000");
});