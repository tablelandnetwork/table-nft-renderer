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

function nameSlice(name, number=20) {
  if(name.length > 20) {
    return name.slice(0, number) + "...";
  }
  return name;
}

const chains = {
  1:        {name: "Ethereum Mainnet",   slug: "ethereum"},
  5:        {name: "Ethereum Goerli",   slug: "ethereum-goerli"},
  10:        {name: "Optimism",   slug: "optimism"},
  69:       {name: "Optimism Kovan",    slug: "optimism-kovan"},
  137:      {name: "Polygon Mainnet",   slug: "polygon"},
  420:      {name: "Optimism Goerli",   slug: "optimism-goerli"},
  80001:    {name: "Polygon Mumbai",    slug: "polygon-mumbai" },
  421611:   {name: "Arbitrum Rinkeby",  slug: "arbitrum-rinkeby" }
};


app.use((req, res, next) => {

  res.set({
      'Cross-Origin-Resource-Policy': 'cross-origin'
  })
  next();
})

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
    let columnStartingPosition = 115;
    const columnsMarkup = columns.map((column, key) => {
      let constraints = column.constraints.length ? `${column.constraints.join(" ")}` : '';
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
      <text x="25" y="55" class="text">${chain.name}</text>
      <text x="25" y="75" class="text">rows: ${data.rows.length}</text>
      <text x="25" y="95" class="text">columns:</text>
      ${columnsMarkup}

    </svg>

    `);
  } catch (e) {
    res.send(`Could not locate table: ${e}`);
  }
});

<path xmlns="http://www.w3.org/2000/svg" d="M 69.274 106.812 C 69.813 104.182 72.154 102.18 74.911 102.18 L 97.728 102.18 C 100.776 102.18 102.135 100.809 103.947 98.147 L 114.004 79.76 C 114.951 78.029 116.802 76.946 118.821 76.946 L 202.778 76.946 C 204.941 76.946 206.738 78.567 206.912 80.658 C 210.289 121.423 214.571 149.054 241.679 174.064 C 244.521 176.689 242.703 181.621 238.779 181.621 L 40.047 181.621 C 36.115 181.621 34.292 176.676 37.142 174.049 C 56.547 156.142 64.321 136.552 68.427 111.198 C 68.633 109.926 68.884 108.706 69.136 107.481 C 69.182 107.258 69.228 107.034 69.274 106.812 Z" style="fill-opacity: 0.2;" />
<path xmlns="http://www.w3.org/2000/svg" d="M 260.051 140.008 C 260.051 206.293 206.317 260.033 140.026 260.033 C 73.739 260.033 20.003 206.293 20.003 140.008 C 20.003 73.719 73.739 19.985 140.026 19.985 C 206.317 19.985 260.051 73.719 260.051 140.008 Z" style="fill: rgba(216, 216, 216, 0); stroke-width: 8px; stroke-miterlimit: 9; mix-blend-mode: darken; stroke-opacity: 0.2; paint-order: fill; stroke: rgb(10, 10, 10);" />
