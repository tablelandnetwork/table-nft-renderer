import { describe, test, afterEach, before } from "mocha";
import { assert } from "sinon";
import fetch from "node-fetch";

describe("SVG Renderer", function () {
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
});
