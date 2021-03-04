const express = require("express");
const router = express.Router();

// /* Route Identify
//  * GET /posts: Get all post data
//  * GET /posts/:id: Get post relevant to post_id
//  */

//controllers
let { getPosts, getPostId } = require("../controllers/post.controller");

router.get("/", getPosts);

router.get("/:id", getPostId);

module.exports = router;
