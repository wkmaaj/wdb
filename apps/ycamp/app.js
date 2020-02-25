const express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	flash = require("connect-flash"),
	dotenv = require("dotenv"),
	seeds = require("./seeds"),
	User = require("./models/user"),
	commentsRoutes = require("./routes/comments"),
	campgroundsRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

dotenv.config();
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
});
if(process.env.SEED_DB) {
	seeds();
}

const app = express();
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.static("../../resources/css/lib"));
app.use(express.static("../../resources/img"));
app.use(express.static("../../resources/js/lib"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
	secret: "google whatever you want",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errormsg = req.flash("error");
	res.locals.infomsg = req.flash("info");
	res.locals.successmsg = req.flash("success");
	next();
});
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT, function() {
	console.log(`YelpCamp running and listening on port ${process.env.PORT}`);
});