const   mongoose = require("mongoose"),
        Schema = mongoose.Schema,
        autoIncrement = require("mongoose-auto-increment"),
        db = require("../db");

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

module.exports = mongoose.model("URL", urlSchema);


