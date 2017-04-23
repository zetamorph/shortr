const URL = require("../models/url"),
      ShortURL = require("../ShortURL"),
      server = require("../server").server;

function getURL (req,res) {
  let encodedURL = req.params.encodedURL;
  if(!encodedURL) {
    res.status(400).json({"error":"Not a valid shortened URL"});
  }
  const decodedURL = ShortURL.decode(encodedURL);
  URL.findOne({"_id" : decodedURL}, (err, result) => {
    if(err) {
      res.status(500).json({"error" : "Internal Server Error"});
    }
    if(result) {
      res.status(302).redirect(result.url);
    }
    else {
      res.status(404).json({"error" : "This shortened URL does not exist"});
    }
  });
}

function postURL (req,res) {
  if(!req.body.url) {
    res.status(400).json({"error": "Bad request"});
  }
  URL.create({"url": req.body.url}, (err, created) => {
    const encodedURL = ShortURL.encode(created.id);
    URL.findOneAndUpdate(
      {_id: created.id}, 
      {$set: {encodedURL : encodedURL}}, 
      {new: true},
      (err, updated) => {
        if(err) {
          res.status(500).json({"error" : "Internal Server Error"});
        } else {
          res.status(201).json({"shortURL" : updated.encodedURL}).end();
        }
    });
  });
}

module.exports = {getURL, postURL};