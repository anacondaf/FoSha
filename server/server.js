require("dotenv").config();

let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// do react chay tren port 3000
const PORT = 3004 || process.env.PORT;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//ROUTES
const GETPOSTS = require("./routes/posts");
const ADDPOST = require("./routes/addPost");

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
app.use("/posts", GETPOSTS);
app.use("/addpost", ADDPOST);

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
