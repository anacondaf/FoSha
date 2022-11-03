require("dotenv").config();

let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const AppError = require("./utils/AppError");
const httpStatus = require("http-status-codes");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//ROUTES
const api = require("./routes");

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

app.use("/api", api);

/**
 * -------------- ERROR HANDLER ----------------
 */

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new AppError(httpStatus.StatusCodes.NOT_FOUND, "Not found.", true));
});

// Error handler
app.use(function (err, req, res, next) {
  let message;
  let status;

  if (err.name === "SequelizeUniqueConstraintError") {
    message = err.errors[0].message;
    status = httpStatus.StatusCodes.UNPROCESSABLE_ENTITY;
    type = `${err.errors[0].path}.used`;
  } else {
    message = err.message;
    status = err.statusCode
      ? err.statusCode
      : httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  }

  res.status(status).json({
    statusCode: status,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
