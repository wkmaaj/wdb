const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cat_app", {useNewUrlParser: true, useUnifiedTopology: true});

console.log("App successfully connected to db");

const catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});
const Cat = mongoose.model("Cat", catSchema);

// const kitty = new Cat({ name: "Mrs. Norris", age: 7, temperament: "Evil" });
// kitty.save(function(err, cat) {
// 	if(err) {
// 		console.error("Save operation unsuccessful");
// 	}
// 	else {
// 		console.log("Successfully saved kitty to db:\n" + cat);
// 	}
// });

Cat.create(
	{ name: "Snow White", age: 15, temperament: "Nice" },
	function(err, cat) {
		if(err) {
			console.error("Save operation unsuccessful");
		}
		else {
			console.log("Successfully saved kitty to db:\n" + cat);
		}
});

Cat.find({}, function(err, cats) {
	if(err) {
		console.error("Find operation unsuccessful:\n" + err);
	}
	else {
		console.log("Successfully queried the db:\n" + cats);
	}
});