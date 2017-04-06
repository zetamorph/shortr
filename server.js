const express = require("express"),
      server = express(),
      path = require("path"),
      mongoose = require("mongoose"),
      autoIncrement = require("mongoose-auto-increment"),
      shortURL = require("./ShortURL.js"),
      bodyParser = require("body-parser"),
      config = require("config");

server.use(express.static(path.join(__dirname, "/public")));
server.set("view engine", "pug");
server.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1/shortr");
const db = mongoose.connection;
autoIncrement.initialize(db);

const urlSchema = new mongoose.Schema({
  url: String,
  encodedURL: String
});

urlSchema.plugin(autoIncrement.plugin, {
    model: "URL",
    field: "_id",
    startAt: 100,
    incrementBy: 1
});

const URL = mongoose.model("URL", urlSchema);

server.get("/:encodedURL", (req,res) => {
  const decodedURL = shortURL.decode(req.params.encodedURL);
  console.log(decodedURL);
  URL.findOne({"_id" : decodedURL}, (err, resultURL) => {
    console.log(resultURL);
    if(err) {
      res.status(404).end();
    }
    res.status(200).json({"url" : resultURL.url}).end();
  });
});

server.post("/new", (req,res) => {
  URL.create({"url": req.body.url}, (err, created) => {
    const encodedURL = shortURL.encode(created.id);
    URL.findOneAndUpdate(
      {_id: created.id}, 
      {$set: {encodedURL : encodedURL}}, 
      {new: true},
      (err, updated) => {
        if(err) {
          res.status(400).end();
        } else {
          res.status(201).json({"shortURL" : updated.encodedURL}).end();
        }
    });
  });
});

server.listen(8080, () => {
  console.log("Shortr API running on port 8080");
});



