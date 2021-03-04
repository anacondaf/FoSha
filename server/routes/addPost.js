const express = require("express");
const router = express.Router();

// /* Route Identify
//  * Post /addpost: Write new post
//  */

router.post("/", (req, res) => {
	console.log(req.body);
	res.send(req.body);
});

module.exports = router;
