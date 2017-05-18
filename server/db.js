const config = require("config");
const mongoose = require("mongoose");

const dbHost = config.get("dbConfig.host");
const dbPort = config.get("dbConfig.port");
const dbName = config.get("dbConfig.name");

var connection = mongoose.connect(dbHost + ":" + dbPort + "/" + dbName);

module.exports = connection;