import express from "express";
import fetch, {Headers} from 'node-fetch';

if (!globalThis.fetch) {
  globalThis.fetch = fetch
  globalThis.Headers = Headers
}
import { Database, Validator, helpers } from '@tableland/sdk';
import font from './font.js';
import findColor from "./findColor.js";
import cors from 'cors';
const app = express();
app.use(cors())
import * as url from 'url';
import path from "path";
const __dirname = url.fileURLToPath(new URL('../', import.meta.url));

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function nameSlice(name, number=20) {
  if(name.length > 20) {
    return name.slice(0, number) + "...";
  }
  return name;
}


app.use((req, res, next) => {

  res.set({
      'Cross-Origin-Resource-Policy': 'cross-origin'
  })
  next();
});

app.get("/:chain_id/:table_id", async (req, res, next) => {

  const chain_id = req.query.chain_id;
  const [table_id, extension] = req.query.table_id.split(".");

  try {
    const chain = helpers.getChainInfo(parseInt(chain_id));
    const validator = Validator.forChain(parseInt(chain_id));
    let table_data = await validator.getTableById({ chainId: chain_id, tableId: table_id })
    let columns = table_data.schema.columns;

    if(extension === "html") {
      return;
    }
    res.set("Content-Type", "image/svg+xml");

    const db = new Database();
    const r = await db.prepare(`SELECT * FROM ${table_data.name};`).all();
    const data = {rows: r.results};
    let columnStartingPosition = 115;
    const columnsMarkup = columns.map((column, key) => {
      let constraints = column?.constraints?.length ? `${column.constraints.join(" ")}` : '';
      let column_details = `${column.name} ${column.type} ${constraints}`;
      let column_value = `<text x="35" y="${columnStartingPosition}" class="text text-small">${nameSlice(column_details, 19)}</text>`;
      let content;
      if(columns.length < 9) {
        content = column_value;
        columnStartingPosition += 20;
        return content;      
      }      
      switch(true) {
        case key < 7:
          content = column_value;      
          break;

        case key === 7: 
          content = `<text x="35" y="${columnStartingPosition}" class="text text-italic line-over">${columns.length - 6} more</text>`;
          break;
        default: 
          content = "";
      }
      columnStartingPosition += 20;
      return content;
    }).join("");
    res.send(`
    <svg class="bg" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <style>
        * {
          font-family: "Andale Mono";
        }
        .bg { background: ${findColor(data.rows.length * columns.length)}; }
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
      <text x="25" y="35" class="text text-name">${nameSlice(table_data.name)}</text>
      <text x="25" y="55" class="text">${chain.chainName}</text>
      <text x="25" y="75" class="text">rows: ${data.rows.length}</text>
      <text x="25" y="95" class="text">columns:</text>
      ${columnsMarkup}

    </svg>

    `);
  } catch (e) {
    res.status(404);
    res.send(`Could not locate table: ${e}`);
  }
});
