const mongoose = require("mongoose");

let PostSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	caption: String,
	mainbackground: String,
	category: String,
	description: String,
	content: String,
	star: Number,
	comments: Number,
	tags: [String],
	date: String,
});

module.exports = mongoose.model("Post", PostSchema, "POST");
