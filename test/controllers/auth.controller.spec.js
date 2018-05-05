const assert = require("assert");
const expect = require("chai").expect;
const should = require("chai").should();
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

chai.use(chaiAsPromised);
chai.should();

const authController = require("../../controllers/auth.controller");

describe("AuthController", () => {
  describe("isAuthorized", () => {
    let user = {};

    beforeEach(() => {
      user = {
        roles: ["user"],
        isAuthorized: function(neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      };
      sinon.spy(user, "isAuthorized");
      authController.setUser(user);
    });

    it("Should return false if not authorized", () => {
      const isAuth = authController.isAuthorized("admin");
      assert.equal(false, isAuth);
      expect(isAuth).to.be.false;
      user.isAuthorized.calledOnce.should.be.true;
    });

    it("Should return true if authorized", () => {
      authController.setRoles(["user", "admin"]);
      const isAuth = authController.isAuthorized("admin");
      isAuth.should.be.true;
    });
  });

  describe("isAuthorizedAsync", () => {
    beforeEach(() => {
      authController.setRoles(["user"]);
    });

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
    beforeEach(() => {
      authController.setRoles(["user"]);
    });

    it("Should return false if not authorized", () => {
      return authController.isAuthorizedPromise("admin").should.eventually.to.be
        .false;
    });
  });

  describe("getIndex", () => {
    let user = {};

    beforeEach(() => {
      user = {
        roles: ["user"],
        isAuthorized: function(neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      };
    });

    it("should render index if authorized", () => {
      const isAuth = sinon.stub(user, "isAuthorized").returns(true);
      const req = { user };
      const res = {
        render: sinon.spy()
      };

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal("index");
    });

    it("should render noAuth if not authorized", () => {
      const isAuth = sinon.stub(user, "isAuthorized").returns(false);
      const req = { user };
      const res = {
        render: sinon.spy()
      };

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal("noAuth");
    });

    it("should render error", () => {
      const isAuth = sinon.stub(user, "isAuthorized").throws();
      const req = { user };
      const res = {
        render: sinon.spy()
      };

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal("error");
    });

    it("should render index if authorized with mock", () => {
      const isAuth = sinon.stub(user, "isAuthorized").returns(true);
      const req = { user };
      const res = {
        render: function() {}
      };

      const mock = sinon.mock(res);
      mock
        .expects("render")
        .once()
        .withExactArgs("index");

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;

      mock.verify();
    });
  });
});
