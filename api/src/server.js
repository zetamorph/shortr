const bodyParser = require("body-parser");
const config = require("config");
const db = require("./db");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const server = express();
const urlRoutes = require("./routes/url");

const PORT = config.get("serverConfig.port");

// Logging interferes with the test output, so it is disabled when NODE_ENV is set to "test".
if(config.util.getEnv("NODE_ENV") !== "test") {
  server.use(morgan("combined"));
}

server.use(bodyParser.json());

server.route("/new")
  .post(urlRoutes.postURL);

server.route("/")
  .get(urlRoutes.getURL);

server.route("/:encodedURL")
  .get(urlRoutes.getURL);

server.listen(PORT, () => {
  if(config.util.getEnv("NODE_ENV") !== "test") {
    console.log("Shortr API running on port " + PORT);
  }
});

module.exports = server;
