const autoIncrement = require("mongoose-auto-increment");
const db = require("../db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShortURL = require("../utils/shortURL");

autoIncrement.initialize(db);

let urlSchema = new Schema({
  url: String,
  encodedURL: String
});

urlSchema.plugin(autoIncrement.plugin, {
    model: "URL",
    field: "_id",
    startAt: 100,
    incrementBy: 1
});

urlSchema.methods.encodeURL = function(cb) {
  this.encodedURL = ShortURL.encode(this._id);
  this.save(cb);
};

module.exports = mongoose.model("URL", urlSchema);
