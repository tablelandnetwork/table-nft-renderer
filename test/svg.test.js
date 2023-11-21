import { describe, test, afterEach, before } from "mocha";
import { assert } from "sinon";
import fetch from "node-fetch";

describe("SVG Service", function () {
  this.timeout("30s");

  before(async function () {
    await new Promise((resolve) => setTimeout(resolve, 10000));
  });

  afterEach(function () {});

  test("Live table returns an SVG", async function () {
    const svg = await fetch("http://localhost:3000/31337/1.svg");
    assert.match(svg.status < 300, true);
    assert.match(svg.headers.get("Content-Type"), "image/svg+xml");
  });
  test("Missing table returns 404 for SVG app", async function () {
    const svg = await fetch("http://localhost:3000/31337/9999.svg");
    assert.match(svg.status, 404);
  });

  test("Wrong extension returns 404", async function () {
    const res = await fetch("http://localhost:3000/31337/1.xyz");
    assert.match(res.status, 404);
    assert.match(
      await res.text(),
      "Not found. This endpoint only supports SVG or HTML extensions."
    );
  });
});
