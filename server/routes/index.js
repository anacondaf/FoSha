const router = require("express").Router();

const GETPOSTS = require("./getPosts");
const ADDPOST = require("./addPost");
const DELETE_IMAGE = require("./deleteImage");
const auth = require("./auth");

router.use("/getPosts", GETPOSTS);
router.use("/addPost", ADDPOST);
router.use("/deleteImage", DELETE_IMAGE);
router.use("/auth", auth);

module.exports = router;
