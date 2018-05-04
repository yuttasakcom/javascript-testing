const assert = require("assert");

const authController = require("../../controllers/auth.controller");

describe("AuthController", () => {
  describe("isAuthorized", () => {
    it("Should return false if not authorized", () => {
      authController.setRoles(["user"]);
      assert.equal(false, authController.isAuthorized("admin"));
    });

    it("Should return true if authorized", () => {
      authController.setRoles(["user", "admin"]);
      assert.equal(true, authController.isAuthorized("admin"));
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
