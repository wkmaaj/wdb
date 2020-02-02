const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const campgrounds = [
	{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"},
	{name: "Granite Hill", image: "https://farm5.staticflickr.com/4111/35744288656_a4e135fa8e.jpg"},
	{name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3021/2386124661_843479d1c8.jpg"}
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