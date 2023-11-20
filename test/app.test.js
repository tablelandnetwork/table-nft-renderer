import { describe, test, afterEach, before } from "mocha";
import { assert } from "sinon";
import fetch from "node-fetch";

describe("HTML Service", function () {
  this.timeout("30s");

  before(async function () {
    await new Promise((resolve) => setTimeout(resolve, 10000));
  });

  afterEach(function () {});

  test("Live table returns the HTML app", async function () {
    const svg = await fetch("http://localhost:3000/31337/1.html");

    assert.match(svg.status < 300, true);
    assert.match(svg.headers.get("Content-Type"), "text/html; charset=utf-8");
  });

  test("Missing table returns 404 for HTML app", async function () {
    const svg = await fetch("http://localhost:3000/31337/9999.html");
    assert.match(svg.status, 404);
  });
});
