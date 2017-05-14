const   express = require("express"),
        server = express(),
        morgan = require("morgan"),
        path = require("path"),
        bodyParser = require("body-parser"),
        config = require("config"),
        middleware = require("./middleware.js"),
        urlRoutes = require("./routes/url"),
        db = require("./db");

server.use(express.static(path.join(__dirname, "/build")));
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
  console.log("Shortr running on port 9000");
});

module.exports = server;
