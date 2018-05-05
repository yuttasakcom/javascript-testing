const assert = require("assert");

describe("Basic Mocha Test", () => {
  it("should deal with objects", () => {
    const obj = { name: "YoYea", gender: "male" };
    const obj2 = { name: "YoYea", gender: "male" };

    obj.should.have.property("name").equal("YoYea");
    obj.should.deep.equal(obj2);
  });
});
