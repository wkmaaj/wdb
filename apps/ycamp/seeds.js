const mongoose = require("mongoose");
const Campground = require("./models/campground");
const cgrounds = require("./models/cgrounds");
const Comment = require("./models/comment");

function seedDb() {
	Campground.deleteMany({}, (err) => {
		if(err) {
			console.error("Unsuccessful seed operation\n" + err);
		}
		else {
			console.log("Successfully removed all campgrounds");
			Comment.deleteMany({}, (err) => {
				if(err) {
					console.error("Unsuccessful seed operation\n" + err);
				}
				else {
					console.log("Successfully removed all comments");
				}
			})
			cgrounds.forEach((cground) => {
				Campground.create(cground, (err, cground) => {
					if(err) {
						console.error("Unsuccessful save operation\n" + err);
					}
					else {
						console.log("Successfully saved campground " + cground.name);
						Comment.create({
							text: "Data seeded from cgrounds",
							author: {username: "Admin"}
						}, (err, comment) => {
							if(err) {
								console.error("Unsuccessful save operation\n" + err);
							} else {
								cground.comments.push(comment);
								Comment.create({
									text: "Additional comment to see how multiple comments manifest in persistence store",
									author: {username: "Admin"}
								}, (err, comment) => {
									if(err) {
										console.error("Unsuccessful save operation\n" + err);
									} else {
										cground.comments.push(comment);
										cground.save();
										console.log("Successfully saved comments to campground " + cground.name);
									}
								});
							}
						});
					}
				});
			});
		}
	});
};

module.exports = seedDb;