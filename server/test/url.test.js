process.env.NODE_ENV = "test";

const mongoose = require("mongoose"),
      URL = require("../models/url"),
      server = require("../server"),
      chai = require("chai"),
      chaiHttp = require("chai-http"),
      should = chai.should();

chai.use(chaiHttp);

describe("URLs", () => {

  beforeEach((done) => {
    URL.remove({}, (err) => {
      done();
    });
  });

  describe("/GET URL", () => {

    it("it should render the homepage when not given a route param", (done) => {
      chai.request(server)
        .get("/")
        .end((err,res) => {
          res.should.be.html;
          done();
        });
    });

    it("it should redirect to the original URL", (done) => {
      chai.request(server)
        .post("/").send({url:"https://de.yahoo.com"}).end((err,res) => {
          chai.request(server)
            .get("/" + res.body.shortURL)
            .end((err, res) => {
              res.should.redirect;
              res.should.redirectTo("https://de.yahoo.com/");
              done();
            });
      });
    });

    it("it should return an error when the shortURL doesn`t exist", (done) => {
      chai.request(server)
        .get("/45g")
        .end((err,res) => {
          res.should.have.status(404);
          done();
        });
    });

  });

  describe("/POST URL", () => {
    it("it should return a shortened URL", (done) => {
      let URL = {
        url: "http://google.com"
      }
      chai.request(server)
        .post("/")
        .send(URL)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("shortURL");
          done();
        });
    });
  });

});