const express = require("express");
const router = express.Router();

// /* Route Identify
//  * GET /getPosts: Get all post data
//  * GET /getPosts/:id: Get post relevant to post_id
//  */

//controllers
let { getPosts, getPostId } = require("../controllers/getpost.controller");

router.get("/", getPosts);

router.get("/:id", getPostId);

module.exports = router;
