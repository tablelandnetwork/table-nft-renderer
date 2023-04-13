import { after, before } from "mocha";
import { LocalTableland } from "@tableland/local";
import '../api/index.js';

const lt = new LocalTableland({ silent: true });

before(async function () {
  this.timeout(30000);
  lt.start();
  await lt.isReady();
});

after(async function () {
  await lt.shutdown();
});
