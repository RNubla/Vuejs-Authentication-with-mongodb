const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./database");
const app = express();

const userAPI = require("./routes/User.route");
mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Connected to DB");
    },
    (error) => {
      console.log("Cannot connect to DB due to: ", error);
    }
  );

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// create port
const server = app.listen(PORT, () => {
  console.log("Connected to port: ", PORT);
});

// API
app.use("/api", userAPI);
/* app.get("/", (req, res) => {
  console.log("Hello MEVN");
}); */

// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

// handle error
app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
