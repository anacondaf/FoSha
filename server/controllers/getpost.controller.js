const mongoose = require("mongoose");

//MongoDB Model
const Post = require("../models/post");

module.exports.getPosts = async (req, res) => {
	try {
		let result = await Post.find();
		res.status(200).json({ postList: result });
	} catch (e) {
		res.status(400).json({ msg: e });
	}
};

module.exports.getPostId = (req, res) => {
	let { id } = req.params;

	Post.findById(id)
		.then((result) => {
			res.status(200).json({
				"postContent": result,
			});
		})
		.catch((e) => {
			console.log(e);
		});
};
