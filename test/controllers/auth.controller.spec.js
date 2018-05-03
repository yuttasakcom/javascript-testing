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
});
