const express = require("express");
const router = express.Router();

//controllers
const { deleteImage } = require("../controllers/deleteImage.controller");

router.delete("/", deleteImage);

module.exports = router;
