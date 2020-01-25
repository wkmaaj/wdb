let express = require('express');
let app = express();

app.get("/", function(req, res) {
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
	let animalSound = "";
	if(req.params.animal === "cow") {
		animalSound = "Moo";
	} else if(req.params.animal === "dog") {
		animalSound = "Woof Woof!";
	} else if(req.params.animal === "pig") {
		animalSound = "Oink";
	}
	else {
		animalSound = "WTF mate?!";
	}

	res.send("The " + req.params.animal + " says \'" + animalSound + "\'");
});

app.get("/repeat/:wordToRepeat/:numOfRepetitions", function(req, res) {
	let numOfRepetitions = Number(req.params.numOfRepetitions);
	if(numOfRepetitions) {
		let str = "";
		for(let i=0; i<numOfRepetitions; i++) {
			str += req.params.wordToRepeat;
			if(i != (numOfRepetitions - 1)) {
				str += " ";
			}
		}
		res.send(str);
	} else {
		res.redirect(301, "/error");
	}
});

app.get("*", function(req, res) {
	res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(3000, function() {
	console.log("Server started up and listening on port 3000");
});