import { describe, test, afterEach, before } from "mocha";
import { assert } from "sinon";
import fetch, { Headers, Request, Response } from "node-fetch";

if (!globalThis.fetch) {
  (globalThis).fetch = fetch;
  (globalThis).Headers = Headers;
  (globalThis).Request = Request;
  (globalThis).Response = Response;
}

describe("SVG Renderer", function () {
  this.timeout("30s");

  before(async function () {
    await new Promise((resolve) => setTimeout(resolve, 10000));
  });

  afterEach(function () {

  });

  test("Live table returns an SVG", async function () {
    const svg = await fetch("http://localhost:3000/31337/1.svg");
    assert.match(svg.status < 300, true);
    assert.match(svg.headers.get("Content-Type"), "image/svg+xml");
  });
  test("Missing table returns 404", async function () {
    const svg = await fetch("http://localhost:3000/31337/9999.svg");
    assert.match(svg.status, 404);
  });
});
