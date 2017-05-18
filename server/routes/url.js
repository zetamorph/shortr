const   URL = require("../models/url"),
        ShortURL = require("../utils/shortURL"),
        md5 = require("md5"),
        _ = require("lodash"),
        axios = require("axios");
        
function getURL (req,res) {
  let encodedURL = req.params.encodedURL;
  if(!encodedURL) {
    res.status(400).json({"error" : "Not a valid shortened URL"});
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

  var results = [];
  function respond() {
    for(i=0; i<results.length; i++) {
      results[i] = _.pick(results[i], ["url", "encodedURL"]);
    }
    res.status(201).json(results).end();
  }

  if(req.body.length === 0) {
    res.status(400).json({"error": "Bad request"});
  }

  URL.create(req.body, (err, created) => {
    var finished = _.after(req.body.length, respond);
    for(i=0; i<req.body.length; i++) {
      URL.findOneAndUpdate(
        {_id: created[i]._id}, 
        {$set: {encodedURL : ShortURL.encode(created[i].id)}}, 
        {new: true},
        (err, updated) => {
          if(err) {
            res.status(500).json({"error": "Internal Server Error"});
          }
          else {
            results.push(updated);
          }
          finished();
      });
    }
  });
}

module.exports = {getURL, postURL};