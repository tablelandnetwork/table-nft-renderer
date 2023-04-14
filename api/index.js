import express from "express";
import fetch, { Headers } from "node-fetch";
import { Validator, helpers } from "@tableland/sdk";
import font from "./font.js";
import findColor from "./findColor.js";
import cors from "cors";
import path from "path";
import { readFileSync } from "fs";

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
}
const app = express();
app.use(cors());

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function nameSlice(name, number = 20) {
  if (name.length > 20) {
    return name.slice(0, number) + "...";
  }
  return name;
}

app.use("/", express.static("./public"));

app.use((req, res, next) => {
  res.set({
    "Cross-Origin-Resource-Policy": "cross-origin",
  });
  next();
});

app.get("/:chainId/:tableId", async (req, res, next) => {
  try {
    const chainId = req.query.chainId || req.params.chainId;
    const [tableId, extension] =
      req.query?.tableId?.split(".") || req.params?.tableId?.split(".");

    const chain = helpers.getChainInfo(parseInt(chainId));
    const validator = Validator.forChain(parseInt(chainId));
    const tableData = await validator.getTableById({ chainId, tableId });
    const columns = tableData.schema.columns;

    if (extension === "html") {
      const indexHtml = readFileSync(
        path.join(process.cwd(), "public", "index.html"),
        "utf8"
      );
      res.send(indexHtml);
      return;
    }

    if (extension !== "svg") {
      res
        .status(404)
        .send("Not found. This endpoint only supports SVG or HTML extensions.");
      return;
    }

    const rows = await validator.queryByStatement({
      statement: "select count(*) from " + tableData.name,
      unwrap: true,
      extract: true,
    });
    let columnStartingPosition = 115;
    const columnsMarkup = columns
      .map((column, key) => {
        const constraints = column?.constraints?.length
          ? `${column.constraints.join(" ")}`
          : "";
        const columnDetails = `${column.name} ${column.type} ${constraints}`;
        const columnValue = `<text x="35" y="${columnStartingPosition}" class="text text-small">${nameSlice(
          columnDetails,
          19
        )}</text>`;
        let content;
        if (columns.length < 9) {
          content = columnValue;
          columnStartingPosition += 20;
          return content;
        }
        switch (true) {
          case key < 7:
            content = columnValue;
            break;

          case key === 7:
            content = `<text x="35" y="${columnStartingPosition}" class="text text-italic line-over">${
              columns.length - 6
            } more</text>`;
            break;
          default:
            content = "";
        }
        columnStartingPosition += 20;
        return content;
      })
      .join("");
    res.set("Content-Type", "image/svg+xml");
    res.send(`
    <svg class="bg" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <style>
        * {
          font-family: "Andale Mono";
        }
        .bg { background: ${findColor(rows * columns.length)}; }
        .text { 
          font: 16px sans-serif; 
          fill: white; 
          font-family: "Andale Mono";
          text-transform: lowercase;
        }
        .text-italic {
          font-style: italic;
        }
        .text-elip {
          font: 80px serif;
        }
        .text-elip:hover {
          fill: grey;
        }
        .seperator {
          width: 100px;
          height: 1px;
          fill: #fff;
        }
        .line-over {
          border-top: 1px solid #fff;
        }
        @font-face { 
          font-family: "Andale Mono";
          ${font}
        }
        </style>
      <text x="25" y="35" class="text text-name">${nameSlice(
        tableData.name
      )}</text>
      <text x="25" y="55" class="text">${chain.chainName}</text>
      <text x="25" y="75" class="text">rows: ${rows}</text>
      <text x="25" y="95" class="text">columns:</text>
      ${columnsMarkup}

    </svg>

    `);
  } catch (e) {
    res.status(404);
    res.send(`Could not locate table: ${e}`);
  }
});
