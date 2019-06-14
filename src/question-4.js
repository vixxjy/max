const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const User = require("./models/user");
const logger = require("./utils/logger");

const mongoDB = process.env.MONGO_URI;

const app = express();

mongoose.connect(mongoDB, { useMongoClient: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

app.use(bodyParser.json());

app.get("/save", async (req, res) => {
    try {
        let userData = { ...req.user };
        let user = await User.create(userData);
        return res.status(200).json(user);
    } catch (err) {
        logger.log(err);
        return res.status(500).json(err);
    }
});

const server = http.createServer(app);

server.listen(80, () => {
  db.on("error", error => {
    logger.log(error);
  });
});