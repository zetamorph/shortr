const config = require("config");
const mongoose = require("mongoose");

const dbHost = config.get("dbConfig.host");
const dbName = config.get("dbConfig.name");

/* 
 * Set the mongoose promise lybrary to the global promise library as mpromise, 
 * the default Mongoose Promise library is deprecated.
 */

mongoose.Promise = global.Promise;

var connection = mongoose.connect(dbHost + dbName, (err) => {

  /* 
   * A DB connection error would prevent the app from being functional at all,
   * so the error can be thrown.
  */ 
  if(err) throw err;

});

// Suppress the DB logging when testing as it interferes with the test output

if(config.util.getEnv("NODE_ENV") !== "test") {

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to " + dbHost + dbName);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Mongoose error: " + err);
  });
}

module.exports = connection;