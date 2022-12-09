import express from "express";
import fetch from 'node-fetch';
import * as tableland from '@tableland/sdk';
import font from './font.js';
import findColor from "./findColor.js";
import cors from 'cors';
const app = express();
app.use(cors())
global.fetch = fetch;
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('../', import.meta.url));


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
  1:        {name: "Ethereum Mainnet",  slug: "ethereum", mainnet: true},
  5:        {name: "Ethereum Goerli",   slug: "ethereum-goerli"},
  10:       {name: "Optimism",          slug: "optimism", mainnet: true},
  69:       {name: "Optimism Kovan",    slug: "optimism-kovan"},
  137:      {name: "Polygon Mainnet",   slug: "polygon", mainnet: true},
  420:      {name: "Optimism Goerli",   slug: "optimism-goerli"},
  80001:    {name: "Polygon Mumbai",    slug: "polygon-mumbai" },
  42161:    {name: "Arbitrum",          slug: "arbitrum", mainnet: true },
  421613:   {name: "Arbitrum Rinkeby",  slug: "arbitrum-goerli" }
};


app.use((req, res, next) => {

  res.set({
      'Cross-Origin-Resource-Policy': 'cross-origin'
  })
  next();
});

app.use('/anim', express.static('./dist/public'));
app.use('/js', express.static('./dist/public/js'));
app.use('/assets', express.static('./dist/public/assets'));
app.use('/3df484376831050b.wasm', express.static('./dist/public/3df484376831050b.wasm'));

app.use('/anim', async (req, res, next) => {
  res.sendFile(`./dist/public/index.html`, {root: __dirname});
});

app.use("/:chain_id([0-9]{1,})/:table_id", async (req, res, next) => {
  try {
    const network = chains[req.params.chain_id].mainnet ? "" : "testnet.";
    let table_data = await fetch(`https://${network}tableland.network/chain/${req.params.chain_id}/tables/${req.params.table_id}`)
      .then(r => r.json());
    let table_schema = await fetch(`https://${network}tableland.network/schema/${table_data.name}`).then(r=>r.json());
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
