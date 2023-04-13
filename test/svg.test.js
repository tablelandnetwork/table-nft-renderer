import { describe, test, afterEach, before } from "mocha";
import { assert } from "sinon";

describe("commands/chains", function () {
  before(async function () {
  });

  afterEach(function () {

  });

  test("Equal", async function () {
    assert.match("foo", "foo");
  });
});
