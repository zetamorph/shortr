sanitize = require("mongo-sanitize");

module.exports = {
  sanitizeBody(req, res, next) {
    req.body = sanitize(req.body);
    next();
  }
}