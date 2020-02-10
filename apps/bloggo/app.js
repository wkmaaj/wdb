const bodyParser = require("body-parser"),
	express = require("express"),
	expressSanitizer = require("express-sanitizer");
	methodOverride = require("method-override");
	mongoose = require("mongoose"),
	app = express();

app.set("view engine", "ejs");
app.use(express.static("../../resources/css/lib"));
app.use(express.static("../../resources/js/lib"));
app.use(express.static("static"));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost:27017/bloggo", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const Bloggo = mongoose.model("Blog", new mongoose.Schema({
	title: String,
	image: {
		type: String,
		default: "https://images.unsplash.com/photo-1490029664681-78a95e3d126d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1084&q=80"
	},
	body: String,
	created: {
		type: Date,
		default: Date.now
	}
}));

app.get("/:var((blogs|home|index)(.html|.ejs)?)?", (req, res) => {
	Bloggo.find({}, (err, blogs) => {
		if(err || (blogs.length === 0)) {
			console.error("Unsuccessful query operation\n" + ((err) ? err : blogs.length));
			res.redirect("/blogs/new");
		}
		else {
			console.log("Successful query operation, " + blogs.length + " blog posts returned");
			res.render("index", {blogs: blogs});
		}
	});
});

app.get("/blogs/new", (req, res) => {
	res.render("new");
});

app.post("/blogs", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Bloggo.create(req.body.blog, function(err, blog) {
		if(err) {
			console.error("Unsuccessful save operation\n" + err);
			res.render("new");
		}
		else {
			console.log("Successful save operation\n" + blog);
			res.redirect("/blogs");
		}
	});
});

app.get("/blogs/:id", (req, res) => {
	Bloggo.findById(req.params.id, (err, blog) => {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
			res.redirect("/blogs");
		}
		else {
			console.log("Successful query operation, returning " + blog.title + " blog post");
			res.render("show", {blog: blog});
		}
	});
});

app.get("/blogs/:id/edit", (req, res) => {
	Bloggo.findById(req.params.id, (err, blog) => {
		if(err) {
			console.error("Unsuccessful query operation\n" + err);
			res.redirect("/blogs/" + req.params.id);
		}
		else {
			console.log("Successful query operation, returning " + blog.title + " blog post");
			res.render("edit", {blog: blog});
		}
	});
});

app.put("/blogs/:id", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Bloggo.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if(err) {
			console.error("Unsuccessful update operation\n" + err);
			res.redirect("/blogs");
		}
		else {
			console.log("Successful update operation for " + updatedBlog.title + " blog post");
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

app.delete("/blogs/:id", (req, res) => {
	Bloggo.findByIdAndRemove(req.params.id, (err) => {
		if(err) {
			console.error("Unsuccessful destroy operation\n" + err);
		}
		res.redirect("/blogs");
	});
});

app.listen(3000, function() {
	console.log("blogGO is RESTed, up, and running on port 3000");
});