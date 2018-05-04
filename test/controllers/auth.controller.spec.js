const assert = require("assert");
const expect = require("chai").expect;
const should = require("chai").should();

const authController = require("../../controllers/auth.controller");

describe("AuthController", () => {
  describe("isAuthorized", () => {
    it("Should return false if not authorized", () => {
      authController.setRoles(["user"]);
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
      authController.setRoles(["user"]);
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
});
