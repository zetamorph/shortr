const   express = require("express"),
        server = express(),
        morgan = require("morgan"),
        path = require("path"),
        bodyParser = require("body-parser"),
        urlRoutes = require("./routes/url"),
        db = require("./db");

var allowCrossDomain = function(req, res, next) {

  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

server.use(express.static(path.join(__dirname, "/public")));
server.set("view engine", "pug");
server.use(morgan("combined"));
server.use(allowCrossDomain);
server.use(bodyParser.json());

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
