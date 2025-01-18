const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const cors = require("cors");

const connectDb = require("./db/db.js");

const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route.js");
const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRoute);

module.exports = app;
