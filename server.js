let   express = require("express"),
      server = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      config = require("config"),
      url = require("./routes/url"),
      db = require("./db");

server.use(express.static(path.join(__dirname, "/public")));
server.set("view engine", "pug");
server.use(bodyParser.json());

server.get("/", (req,res) => {
  res.render("index");
});

server.route("/")
  .get((req,res) => {
    res.render("index");
  })
  .post(url.postURL);

server.route("/:encodedURL").get(url.getURL);

server.listen(8080, () => {
  console.log("Shortr running on port 8080");
});

module.exports = server



