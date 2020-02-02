const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const campgrounds = [
	{name: "Salmon Creek", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d2f7add9148c551_340.jpg"},
	{name: "Granite Hill", image: "https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c7d2f7add9148c551_340.jpg"},
	{name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2f7add9148c551_340.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));
app.use(express.static("../resources/css/lib"));
app.use(express.static("../resources/js/lib"));
app.set("view engine", "ejs");

app.get("/:var((home|index)(.html|.ejs)?)?", (req, res) => {
	res.render("index");
});

app.get("/campgrounds", (req, res) => {
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
	req.body.name;
	req.body.image;
	campgrounds.push({name: req.body.name, image: req.body.image});
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});

app.listen(3000, function() {
	console.log("YelpCamp up and running, currently listening on port 3000");
});