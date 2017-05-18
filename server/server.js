const  bodyParser = require("body-parser");
const  db = require("./db");
const  express = require("express");
const  middleware = require("./utils/middleware.js");
const  morgan = require("morgan");
const  path = require("path");
const  server = express();
const  urlRoutes = require("./routes/url");

server.use(express.static(path.join(__dirname, "../build")));
server.use(morgan("combined"));
server.use(bodyParser.json());

server.get("/", (req,res) => {
  res.render("index.html");
});

server.route("/new")
  .post(middleware.sanitizeBody, urlRoutes.postURL);

server.route("/:encodedURL")
  .get(urlRoutes.getURL);

server.listen(9000, () => {
  console.log("Shortr API running on port 9000");
});

module.exports = server;
