require("dotenv").config();

let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//ROUTES
const GETPOSTS = require("./routes/getPosts");
const ADDPOST = require("./routes/addPost");
const DELETE_IMAGE = require("./routes/deleteImage");

mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("Database is connected");
	}
);

app.get("/", (req, res) => {
	res.send("Welcome to Fosha API");
});

//Use middleware
app.use("/getPosts", GETPOSTS);
app.use("/addPost", ADDPOST);
app.use("/deleteImage", DELETE_IMAGE);

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
