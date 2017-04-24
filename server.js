const   express = require("express"),
        server = express(),
        morgan = require("morgan"),
        path = require("path"),
        bodyParser = require("body-parser"),
        config = require("config"),
        urlRoutes = require("./routes/url"),
        db = require("./db");

server.use(express.static(path.join(__dirname, "/public")));
server.set("view engine", "pug");
server.use(bodyParser.json());
server.use(morgan("combined"));

server.get("/", (req,res) => {
  res.render("index");
});

server.route("/new")
  .post(urlRoutes.postURL);

server.route("/:encodedURL")
  .get(urlRoutes.getURL);

server.listen(9000, () => {
  console.log("Shortr running on port 9000");
});

module.exports = server;



