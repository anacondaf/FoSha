const mongoose = require("mongoose");

//MongoDB Model
const Post = require("../models/post");

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

module.exports.addPost = (req, res) => {
	let { postContent } = req.body;

	let newPost = new Post({
		_id: new mongoose.Types.ObjectId(),
		caption: postContent.caption,
		mainbackground: postContent.mainbackground,
		category: postContent.category,
		description: postContent.content.substring(0, 100),
		content: postContent.content,
		date: today,
		tags: postContent.tagsList,
	});

	newPost.save().catch((e) => console.log(e));
};
