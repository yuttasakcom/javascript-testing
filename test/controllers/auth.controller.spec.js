const assert = require("assert");
const expect = require("chai").expect;
const should = require("chai").should();
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const authController = require("../../controllers/auth.controller");

describe("AuthController", () => {
  beforeEach(() => {
    authController.setRoles(["user"]);
  });

  describe("isAuthorized", () => {
    it("Should return false if not authorized", () => {
      const isAuth = authController.isAuthorized("admin");
      assert.equal(false, isAuth);
      expect(isAuth).to.be.false;
    });

    it("Should return true if authorized", () => {
      authController.setRoles(["user", "admin"]);
      const isAuth = authController.isAuthorized("admin");
      isAuth.should.be.true;
    });
  });

  describe("isAuthorizedAsync", () => {
    it("Should return false if not authorized", done => {
      authController.isAuthorizedAsysnc("admin", isAuth => {
        assert.equal(false, isAuth);
        done();
      });
    });

    it("Should return true if authorized", done => {
      authController.setRoles(["user", "admin"]);
      authController.isAuthorizedAsysnc("admin", isAuth => {
        assert.equal(true, isAuth);
        done();
      });
    });
  });

  describe("isAuthorizedPromise", () => {
    it("Should return false if not authorized", () => {
      return authController.isAuthorizedPromise("admin").should.eventually.to.be
        .false;
    });
  });
});
