const express = require("express");
const router = express.Router();

// /* Route Identify
//  * Post /add-post: Write new post
//  */

//controllers
const { addPost } = require("../controllers/addpost.controller");

router.post("/", addPost);

module.exports = router;
