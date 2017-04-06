process.env.NODE_ENV = "test";

const mongoose = require("mongoose"),
      URL = require("../app/models/urlModel");
      chai = require("chai"),
      chaiHttp = require("chai-http"),
      server = require("../server"),
      should = chai.should();

chai.use(chaiHttp);

describe("URLs", () => {
  beforeEach((done) => {
    URL.remove({}, (err) =>  {
      done();
    });
  });
});
