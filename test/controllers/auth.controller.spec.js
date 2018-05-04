const assert = require("assert");

const authController = require("../../controllers/auth.controller");

describe("AuthController", () => {
  describe("isAuthorized", () => {
    it("Should return false if not authorized", () => {
      assert.equal(false, authController.isAuthorized(["user"], "admin"));
    });

    it("Should return true if authorized", () => {
      assert.equal(
        true,
        authController.isAuthorized(["user", "admin"], "admin")
      );
    });
  });

  describe("isAuthorizedAsync", () => {
    it("Should return false if not authorized", done => {
      authController.isAuthorizedAsysnc(["user"], "admin", isAuth => {
        assert.equal(false, isAuth);
        done();
      });
    });

    it("Should return true if authorized", done => {
      authController.isAuthorizedAsysnc(["user", "admin"], "admin", isAuth => {
        assert.equal(true, isAuth);
        done();
      });
    });
  });
});
