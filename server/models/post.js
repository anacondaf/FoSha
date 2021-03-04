const mongoose = require("mongoose");

let PostSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	caption: String,
	mainbackground: String,
	category: String,
	description: String,
	star: Number,
	comments: Number,
	tags: String,
	date: Date,
});

module.exports = mongoose.model("Post", PostSchema, "POST");
