const URL = require("../models/url");
const ShortURL = require("../utils/shortURL");
const sanitize = require("mongo-sanitize");
const _ = require("lodash");
        
function getURL (req,res) {

  let encodedURL = sanitize(req.params.encodedURL);

  if(!encodedURL) {
    return res.status(400).json({"error" : "Not a valid shortened URL"});
  }

  const decodedURL = ShortURL.decode(encodedURL);
  
  URL.findOne({"_id" : decodedURL}, (err, result) => {
    if(err) {
      return res.status(500).json({"error" : "Internal Server Error"});
    }
    if(result) {
      res.status(200).json({decodedURL: result.url});
    }
    else {
      return res.status(404).json({"error" : "This shortened URL does not exist"});
    }
  });
}

function postURL (req,res) {

  var results = [];
  function respond() {
    for(i=0; i<results.length; i++) {
      results[i] = _.pick(results[i], ["url", "encodedURL"]);
    }
    res.status(201).json(results);
  }

  if(req.body.length === 0 || req.body.length > 10) {
    return res.status(400).json({"error": "Bad request"});
  }

  var finished = _.after(req.body.length, respond);

  for(i=0; i<req.body.length; i++) {

    req.body[i] = sanitize(req.body[i]);

    URL.create(req.body[i], (err, created) => {
      created.encodeURL((err, saved) => {
        if(err) {
          res.status(500).json({ "error": "Internal Server Error" });
        }
        else {
          results.push(saved);
        }
        finished();
      });
      
    });
  }
}

module.exports = {getURL, postURL};