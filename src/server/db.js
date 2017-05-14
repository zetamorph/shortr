const mongoose = require("mongoose"),
      config = require("config");

var connection = mongoose.connect("mongodb://127.0.0.1/shortr");

module.exports = connection;