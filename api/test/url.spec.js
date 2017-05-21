process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const URL = require("../src/models/url");
const server = require("../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const config = require("config");
const expect = chai.expect;

chai.use(chaiHttp);

// Test

describe("URLs", () => { 

  describe("POST URL", () => {

    beforeEach((done) => {
      URL.find({}).remove((err) => {
        if(err) throw err;
        URL.find({}, (err, found) => {
          done();
        });
        
      });
      
    });

    it("it should return a shortened URL when given a single URL to shorten", (done) => {
      let testURL = [{ url: "http://google.com" }];
      chai.request("localhost:9123")
        .post("/new")
        .set("Content-Type", "application/json")
        .send(testURL)
      .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.length(1);
          expect(res.body[0]).to.have.property("encodedURL");
        done();
      })
      .catch(err => {throw err});

    });

    it("it should return multiple shortened URLs when given multiple URLs to shorten", (done) => {

      let testURLs = [
        { url: "http://google.de" },
        { url: "http://google.com" },
        { url: "http://google.br" },
        { url: "http://google.pt" },
        { url: "http://google.co.uk" },
        { url: "http://google.in" }
      ];

      chai.request(server)
        .post("/new")
        .set("Content-Type", "application/json")
        .send(testURLs)
      .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.length(testURLs.length);
          expect(res.body[3]).to.have.property("encodedURL");
          expect(res.body[2]).to.have.property("url");
        done();
      })
      .catch((err) => {
        throw err
      });
        
    });

    it("it should not accept more than 10 URLs simultaneously", (done) => {

      let testURL = { url: "http://google.de" };
      let testURLs = [];
      for(i=0; i<11; i++) {
        testURLs.push(testURL);
      }

      chai.request(server)
        .post("/new")
        .set("Content-Type", "application/json")
        .send(testURLs)
      .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.have.property("error");
        done();
      });
    });

  });

  describe("GET URL", () => {

    let originalURL = "http://google.de";
    let encodedURL = "";

    beforeEach((done) => {
      URL.find({}).remove(() => {
        URL.create({url: originalURL}, (err, created) => {
          created.encodeURL((err, updated) => {
            encodedURL = updated.encodedURL;
            done();
          });
        });
      });
    });

    it("it should retrieve the original URL when given the encoded URL", (done) => {
      chai.request(server)
        .get("/" + encodedURL)
      .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property("decodedURL");
          expect(res.body.decodedURL).to.equal(originalURL);
        done();
      });

    });

    it("it should return an error when the encoded URL does not exist", (done) => {
      chai.request(server)
        .get("/" + "9Z")
      /* 
       * I have to use .end here because using .then would result in Chai throwing an 
       * UnhandledPromiseRejectionError which prevents testing of the response 
       */
      .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          expect(res.body).to.have.property("error");
          expect(res.body).to.not.have.property("decodedURL");
        done();
      })
    });

    it("it should return an error when no encoded URL is given", (done) => {
      chai.request(server)
        .get("/")
      /* 
       * I have to use .end here because using .then would result in Chai throwing an 
       * UnhandledPromiseRejectionError which prevents testing of the response 
       */
      .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.have.property("error");
          expect(res.body).to.not.have.property("decodedURL");
        done();
      })
    });

  });

});
