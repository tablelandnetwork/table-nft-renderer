import express from "express";
import fetch from 'node-fetch';
import * as tableland from '@tableland/sdk';
import font from './font.js';
import findColor from "./findColor.js";
const app = express();
global.fetch = fetch;

const port = 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



const chains = {
  1:        {name: "Etherum Mainnet",   slug: "ethereum"},
  5:        {name: "Ethereum Goerli",   slug: "ethereum-goerli"},
  69:       {name: "Optimism Kovan",    slug: "optimism-kovan"},
  80001:    {name: "Polygon Mumbai",    slug: "polygon-mumbai" },
  421611:   {name: "Arbitrum Rinkeby",  slug: "arbitrum-rinkeby" }
};

app.use("/:chain_id/:table_id", async (req, res, next) => {
  try {
    let table_data = await fetch(`https://testnet.tableland.network/chain/${req.params.chain_id}/tables/${req.params.table_id}`)
      .then(r => r.json());
    let table_schema = await fetch(`https://testnet.tableland.network/schema/${table_data.name}`).then(r=>r.json());
    let columns = table_schema.columns;
    const chain = chains[req.params.chain_id];
    if(!chain) throw ("unknown chain");
    let conn = await tableland.connect({
      chain: chain.slug
    });
    let data = await conn.read(`SELECT * FROM ${table_data.name};`);
    res.set("Content-Type", "image/svg+xml");
    let columnStartingPosition = 95;
    const columnsMarkup = columns.map((column, key) => {
      let constraints = column.constraints.length ? `(${column.constraints.join(",")})` : '';
      let column_value = `<text x="19" y="${columnStartingPosition}" class="text text-small">${column.name} ${column.type} ${constraints}</text>`;
      let content;
      if(columns.length < 9) {
        content = column_value;
        columnStartingPosition += 15;
        return content;      
      }      
      switch(true) {
        case key < 6: 
          content = column_value;      
          break;
        case key === 6: 
          content = `<text x="19" y="${columnStartingPosition}" class="text text-small line-over">-</text>`;
          break;
        case key === 7: 
          content = `<text x="19" y="${columnStartingPosition}" class="text text-small line-over">${columns.length - 6} more columns</text>`;
          break;
        default: 
          content = "";
      }
      columnStartingPosition += 15;
      return content;
    }).join("");
    res.send(`
    <svg class="bg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <style>
        * {
          font-family: "Andale Mono";
        }
        .bg { background: ${findColor(data.rows.length)}; }
        .text { 
          font: 16px sans-serif; 
          
          fill: white; 
          font-family: "Andale Mono";
          text-transform: lowercase;
        }
        .text-name {
          font-weight: 900;
        }
        .text-small {
          font: italic 12px sans-serif;
          font-family: "Andale Mono";
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
      <text x="5" y="20" class="text text-name">${table_data.name}</text>
      <text x="5" y="40" class="text">${chain.name}</text>
      <text x="5" y="60" class="text">rows: ${data.rows.length}</text>
      <text x="5" y="80" class="text">columns:</text>
      ${columnsMarkup}
      <text y="220" x="90" class="text text-elip">...</text>
    </svg>

    `);
  } catch (e) {
    res.send(`Could not locate table: ${e}`);
  }
});
